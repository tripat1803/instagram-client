"use client";

import { authAxios, publicAxios } from "@/utils/api";
import "./globals.css";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export default function RootLayout({ children, user }) {
  let signalController = new AbortController();
  const [auth, setAuth] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    authAxios.get("/api/user/", {
      signal: signalController.signal
    }).then((res) => {
      if (res.data) {
        setUserDetails(res.data);
      }
    }).catch((err) => {});
  }

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  useEffect(() => {
    if(auth){
      fetchUserDetails();
    }

    return () => {
      signalController.abort();
    }
  }, [auth]);

  return (
    <html lang="en">
      <body>
        <AuthContext.Provider value={{ auth, setAuth, userDetails }}>
          {(auth) ? user : children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}