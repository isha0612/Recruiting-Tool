import React, { useState, FormEvent } from "react";
import { axiosInst } from "../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddCandidate() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    const [details, setDetails] = useState({
        name: data?.name ?? "",
        email: data?.email ?? "",
        phone: data?.phone ?? "",
        skills: data?.skills ?? "",
        status: data?.status ?? "",
        salary: data?.salary ?? "",
        id: data?.id ?? ""
    });

    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setDetails(prevUserDetails => {
            return {
                ...prevUserDetails,
                [name]: value
            }
        });
    }

    async function handleForm(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        try {
            let response;
            if (data === null || data === undefined) {
                response = await axiosInst.post("/candidates", { details });
            } else {
                response = await axiosInst.put("/candidates", { details });
            }
            if (response.status === 201) {
                toast(response.data.message, {
                    type: "success", autoClose: 1000, onClose: () => {
                        navigate("/home");
                    }
                });
            }
        } catch (err: Error | any) {
            toast(err.response.data.error, { type: "error", autoClose: 1000 });
        }
    }

    return (
        <div className="h-screen">
            <Navbar page="candidate" />
            <form className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 
        items-center mt-20 md:mt-20 mx-5 md:mx-0 md:my-0" method="POST" onSubmit={handleForm}>
                <div className="md:w-1/3 max-w-sm">
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text" placeholder="Name" value={details.name}
                        onChange={inputChange} name="name" required />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="email" placeholder="Email Address" value={details.email}
                        onChange={inputChange} name="email" required />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="phone" placeholder="Phone" value={details.phone}
                        onChange={inputChange} name="phone" required />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="text" placeholder="Skills and Years of Experience (for eg: nodejs-2 reactjs-1)" value={details.skills}
                        onChange={inputChange} name="skills" required />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="text" placeholder="Status (for eg: Contacted, Interview Scheduled etc)" value={details.status}
                        onChange={inputChange} name="status" required />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="number" placeholder="Salary in INR (for eg: 20000)" value={details.salary}
                        onChange={inputChange} name="salary" required />
                    <div className="text-center md:text-left">
                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">{data === null || data === undefined ? <span>Submit</span> : <span>Update</span>}</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}