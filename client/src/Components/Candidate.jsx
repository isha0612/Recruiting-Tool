import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Candidate({ data }) {
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
        <div className="min-w-[300px] hover:shadow-lg p-6 ml-10 mr-5 mt-5 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h6 className="mb-2 text-xl underline font-bold tracking-tight text-gray-900 dark:text-white">Name: <span className="text-blue-500">{data.name}</span></h6>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Email: <span className="text-blue-500">{data.email}</span></p>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Phone: <span className="text-blue-500">{data.phone}</span></p>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Skills: <span className="text-blue-500">{data.skills}</span></p>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Status: <span className="text-blue-500">{data.status}</span></p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Salary: <span className="text-blue-500">{data.salary}</span></p>
            <div className="flex justify-between items-end">
                <span className="mb-1 font-bold uppercase text-blue-500 dark:text-gray-900">Score: {score}</span>
                <div onClick={handleEdit} className="hover:cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Edit
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </div>
            </div>
        </div>
    )
}