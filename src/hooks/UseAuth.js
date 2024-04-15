"use client";

import { publicAxios } from '@/utils/api';
import { useEffect, useState } from 'react'

export default function UseAuth() {
    const [auth, setAuth] = useState({
        authentication: false,
        role: "USER"
    })

    useEffect(() => {
        (async () => {
            publicAxios.get("/api/user/", {
                headers: {
                    "x-auth-token": localStorage.getItem("auth-token")
                }
            }).then((res) => {
                if (res.data) {

                }
            }).catch((err) => {
                console.log(err);
            })
        })();
    }, []);

    return { auth, setAuth }
}