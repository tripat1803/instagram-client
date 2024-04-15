"use client";

import { AuthContext } from '@/app/layout';
import { publicAxios } from '@/utils/api';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { RiFacebookBoxFill } from "react-icons/ri";

export default function Signin({ leftImage = false }) {

    let { setAuth } = useContext(AuthContext);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        setLoader(true);
        publicAxios.post("/api/auth/login", data, {
            withCredentials: true
        }).then((res) => {
            if (res.data) {
                localStorage.setItem("auth-token", res.data.access_token);
                setAuth(true);
            }
            setData({
                email: "",
                password: ""
            });
            setLoader(false);
        }).catch((err) => {
            setLoader(false);
            setData({
                password: "",
                email: data.email
            });
            setError(true);
        });
    }

    useEffect(() => {
        if (data.email != "" && data.password != "" && data.password.length >= 5) {
            setLoader(false);
        } else {
            setLoader(true);
        }
    }, [data]);

    return (
        <div className='min-h-screen py-8 px-8 sm:px-16 flex justify-center items-center'>
            {
                (leftImage) && <div style={{
                    backgroundImage: "url(https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones-2x.png?__makehaste_cache_breaker=73SVAexZgBW)",
                    backgroundSize: "468.32px 634.15px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "-46px 0"
                }} className='h-[582px] basis-[380.32px] mr-8'></div>
            }
            <div className='h-full flex-1 max-w-[350px] flex flex-col gap-2'>
                <div className='flex flex-col px-12 pt-12 pb-4 border items-center'>
                    <div style={{
                        backgroundImage: "url(https://static.cdninstagram.com/rsrc.php/v3/ys/r/WBLlWbPOKZ9.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0 0",
                        backgroundSize: "176px 264px"
                    }} className='mb-8 w-[176px] h-[52px] overflow-hidden px-8'>
                    </div>
                    <input value={data.email} onChange={e => setData((prev) => ({ ...prev, email: e.target.value }))} className='w-full outline-none border border-[#99999966] focus-within:border-[#999999] px-2 py-1.5 bg-[#99999912] text-sm rounded-sm placeholder:text-[0.8rem] placeholder:text-[#666666] placeholder:font-light mb-2' placeholder='Email' />
                    <input type='password' value={data.password} onChange={e => {
                        setData((prev) => ({ ...prev, password: e.target.value }));
                    }} className='w-full outline-none border border-[#99999966] focus-within:border-[#999999] px-2 py-1.5 bg-[#99999912] text-sm rounded-sm placeholder:text-[0.8rem] placeholder:text-[#666666] placeholder:font-light mb-3' placeholder='Password' />
                    <button onClick={handleLogin} disabled={loader} className={`text-center w-full text-white py-1 rounded-md ${loader ? "bg-[#4CB5F9]" : "bg-[#0095F6] hover:bg-[#0077f6]"} text-sm mb-4`}>Log in</button>
                    <div className='w-full flex gap-4 items-center text-sm text-[#666666] before:border-[0.5px] before:flex-1 after:border-[0.5px] after:flex-1 mb-4'>OR</div>
                    <button className='text-center w-full pt-1 pb-1.5 rounded-md mb-3 text-[#385185] text-[0.9rem] font-medium flex items-center gap-1.5 justify-center'><RiFacebookBoxFill size={22} /> Log in with Facebook</button>
                    {error && <p className='w-full text-center text-[red] font-normal text-[0.8rem] mb-3'>Sorry, your password was incorrect. Please double-check your password.</p>}
                    <button className='text-center w-full rounded-md text-[0.7rem] text-[#00376b]'>Forgot Password?</button>
                </div>
                <div className='flex gap-1 px-12 py-6 border justify-center items-center text-[0.9rem]'><p>Don't have an account?</p><Link className='text-[#4cb5f9] font-medium' href={""}>Sign up</Link></div>
                <div className='flex flex-col items-center gap-3.5 mt-2'>
                    <p className='text-sm'>Get the app</p>
                    <div className='flex gap-2 w-full justify-center'>
                        <img className='w-[130px] object-contain' src='https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png' />
                        <img className='w-[110px] object-contain' src='https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png' />
                    </div>
                </div>
            </div>
        </div>
    );
}