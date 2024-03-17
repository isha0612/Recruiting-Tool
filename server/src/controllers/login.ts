import { generateAuthToken } from '../utils/jwt';
import { Response } from 'express';
import { LoginInput } from '../schema/login';
import bcrypt from 'bcryptjs';
import { catchAsync } from '../utils/catchAsync';

const login = catchAsync(async (req: { body: LoginInput }, res: Response) => {
    const { email, password } = req.body;

    if (email === null || email === undefined || password === null || password === null) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await prisma?.user.findUnique({ where: { email } });

        if (userExist === null || userExist === undefined) {
            return res.status(422).json({ error: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            return res.status(422).json({ error: "Invalid credentials" });
        }
        else {
            const token = generateAuthToken({ id: userExist.id });
            console.log("User logged in successfully");
            return res.status(201).json({ message: "User logged in successfully" , jwtoken: token});
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default login;