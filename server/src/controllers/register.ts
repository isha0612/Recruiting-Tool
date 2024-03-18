import { generateAuthToken } from '../utils/jwt';
import { Response } from 'express';
import { RegisterInput } from '../schema/register';
import bcrypt from 'bcryptjs';
import { catchAsync } from '../utils/catchAsync';

const register = catchAsync(async (req: { body: RegisterInput }, res: Response) => {
    const { email, password1, password2 } = req.body;

    if (email === null || email === undefined || 
        password1 === null || password1 === null ||
        password2 === null || password2 === null) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if(password1 !== password2) {
        return res.status(422).json({ error: "Passwords do not match" });
    }

    try {
        const userExist = await prisma?.user.findUnique({ where: { email } });

        if (userExist !== null && userExist !== undefined) {
            return res.status(422).json({ error: "User already exists" });
        }

        const pd = await bcrypt.hash(password1, 10);
        const user = await prisma?.user.create({
            data: {
                email,
                password: pd
            },
            select: {
                id: true,
                email: true,
                password: false
            }
        });

        if (user === null || user === undefined) {
            return res.status(500).json({ error: "Error Creating User" });
        }

        const token = generateAuthToken({ id: user.id });
        return res.status(201).json({ message: "User registered successfully" , jwtoken: token});

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default register;