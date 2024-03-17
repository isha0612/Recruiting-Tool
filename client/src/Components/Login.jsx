import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInst } from "../utils/axios";
import { useUser } from "../Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const src = "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp";

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useUser();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
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
        try {
            const response = await axiosInst.post("/login", userDetails);
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
                    password: ""
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
                    type="password" placeholder="Password" value={userDetails.password} minlength="6"
                    onChange={inputChange} name="password" required />
                {/* <div className="mt-4 flex justify-between font-semibold text-sm">
                    <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
                </div> */}
                <div className="text-center md:text-left">
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don't have an account? <Link to="/register" className="text-red-600 hover:underline hover:underline-offset-4">Register</Link>
                </div>
            </div>
            <ToastContainer />
        </form>
    );
}
