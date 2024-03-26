import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CandidateProps {
    name: string;
    email: string;
    phone: string;
    skills: string;
    status: string;
    salary: string;
}

export default function Candidate({ data }: { data: CandidateProps }) {
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (data.skills) {
            let currScore = 0;
            const skillArr = data.skills.split(" ");
            for (let skill of skillArr) {
                const splitSkill = skill.split("-");
                if (splitSkill[0] === 'reactjs' || splitSkill[0] === 'nodejs') {
                    if (splitSkill[1] > '2')
                        currScore += 3;
                    else
                        currScore += parseInt(splitSkill[1]);
                }
            }
            setScore(currScore);
        }
    }, [score, data.skills]);

    function handleEdit() {
        navigate('/add_candidate', { state: { data } });
    }

    return (
        <div className="min-w-[210px] hover:shadow-lg p-1 ml-8 mr-6 mt-5 mb-5 border rounded-lg shadow dark:bg-gray-800 dark:border-white bg-white border-gray-200 sm:p-5 sm:min-w-[300px]">
            <h6 className="mb-2 m-2 text-lg underline font-bold text-gray-900 dark:text-white sm:text-base">Name: <span className="text-blue-500">{data.name}</span></h6>
            <p className="mb-1 m-2 text-sm text-gray-700 dark:text-white sm:text-base">Email: <span className="text-blue-500">{data.email}</span></p>
            <p className="mb-1 m-2 text-sm text-gray-700 dark:text-white sm:text-base">Phone: <span className="text-blue-500">{data.phone}</span></p>
            <p className="mb-1 m-2 text-sm text-gray-700 dark:text-white sm:text-base">Skills: <span className="text-blue-500">{data.skills}</span></p>
            <p className="mb-1 m-2 text-sm text-gray-700 dark:text-white sm:text-base">Status: <span className="text-blue-500">{data.status}</span></p>
            <p className="mb-3 m-2 text-sm text-gray-700 dark:text-white sm:text-base">Salary: <span className="text-blue-500">{data.salary}</span></p>
            <div className="flex justify-between items-end mb-2 sm:mb-0">
                <span className="mb-1 m-2 font-bold uppercase text-blue-500 dark:text-white text-sm sm:text-base">Score: {score}</span>
                <div onClick={handleEdit} className="hover:cursor-pointer inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white text-sm bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base sm:px-3 py-2">
                    Edit
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </div>
            </div>
        </div>
    )
}