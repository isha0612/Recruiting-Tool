import { verifyAuthToken } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import jwt from 'jsonwebtoken';

const Authenticate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization === null || req.headers.authorization === undefined) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = verifyAuthToken(token) as jwt.JwtPayload;

        if(verifyToken === null || verifyToken === undefined) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const rootUser = await prisma?.user.findUnique({ where: { id: parseInt(verifyToken.id) } });

        if (rootUser === null || rootUser === undefined) {
            return res.status(401).json({ error: "User not found" });
        }

        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
});

export default Authenticate;