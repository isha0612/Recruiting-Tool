import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInst } from "../utils/axios";
import { useUser } from "../Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const src = "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp";

export default function Register() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useUser();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password1: "",
        password2: ""
    });

    function inputChange(e) {
        const { name, value } = e.target;
        setUserDetails(prevUserDetails => {
            return {
                ...prevUserDetails,
                [name]: value
            }
        });
    }

    async function handleForm(e) {
        e.preventDefault();
        if (userDetails.password1 !== userDetails.password2) {
            toast("Passwords do not match. Try again!", { type: "warning", autoClose: 1000 });
            setUserDetails(() => {
                return {
                    email: "",
                    password1: "",
                    password2: ""
                }
            });
            return;
        }

        try {
            const response = await axiosInst.post("/register", userDetails);
            if (response.status === 201) {
                setIsAuthenticated(true);
                localStorage.setItem("jwtoken", response.data.jwtoken);
                toast(response.data.message, {
                    type: "success", autoClose: 1000, onClose: () => {
                        navigate("/home");
                    }
                });
            }
        }
        catch (err) {
            toast(err.response.data.error, { type: "error", autoClose: 1000 });
            setUserDetails(() => {
                return {
                    email: "",
                    password1: "",
                    password2: ""
                }
            });
        }
    }

    return (
        <form className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 
        items-center my-2 mx-5 md:mx-0 md:my-0" method="POST" onSubmit={handleForm}>
            <div className="md:w-1/3 max-w-sm">
                <img src={src} alt="Sample" />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="email" placeholder="Email Address" value={userDetails.email}
                    onChange={inputChange} name="email" required />
                <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password" placeholder="Password" value={userDetails.password1} minlength="6"
                    onChange={inputChange} name="password1" required />
                <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password" placeholder="Confirm Password" value={userDetails.password2} minlength="6"
                    onChange={inputChange} name="password2" required />
                <div className="text-center md:text-left">
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Register</button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account? <Link to="/" className="text-red-600 hover:underline hover:underline-offset-4">Login</Link>
                </div>
            </div>
            <ToastContainer />
        </form>
    );
}
