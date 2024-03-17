import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";

const getCandidates = catchAsync(async (req: Request, res: Response) => {
    try {
        const candidates = await prisma?.candidate.findMany();
        console.log("candidates ", candidates);
        return res.status(200).send(candidates);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

const postCandidates = catchAsync(async (req: Request, res: Response) => {
    try {
        const { details: { name, email, phone, skills, status, salary } } = req.body;

        if (name === null || name === undefined ||
            email === null || email === undefined ||
            phone === null || phone === undefined ||
            skills === null || skills === undefined ||
            status === null || status === undefined ||
            salary === null || salary === undefined
        ) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }

        const candidate = await prisma?.candidate.create({
            data: {
                name,
                email,
                phone,
                skills,
                status,
                salary
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                skills: true,
                status: true,
                salary: true
            }
        });

        if (candidate === null || candidate === undefined) {
            return res.status(500).json({ error: "Error Creating Candidate" });
        }

        return res.status(201).json({ message: "Candidate Added successfully" });
    }
    catch (err) {
        return res.status(422).json({ err });
    }
});

const editCandidates = catchAsync(async (req: Request, res: Response) => {
    try {
        const { details: { id, name, email, phone, skills, status, salary } } = req.body;

        if (name === null || name === undefined ||
            email === null || email === undefined ||
            phone === null || phone === undefined ||
            skills === null || skills === undefined ||
            status === null || status === undefined ||
            salary === null || salary === undefined
        ) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }

        const candidateExist = await prisma?.candidate.findUnique({ where: { id } });

        if (candidateExist === null || candidateExist === undefined) {
            return res.status(422).json({ error: "Candidate does not exist" });
        }

        const candidate = await prisma?.candidate.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                skills,
                status,
                salary
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                skills: true,
                status: true,
                salary: true
            }
        });

        if (candidate === null || candidate === undefined) {
            return res.status(500).json({ error: "Error updating candidate" });
        }
        
        return res.status(201).json({ message: "Candidate Updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export { getCandidates, postCandidates, editCandidates };