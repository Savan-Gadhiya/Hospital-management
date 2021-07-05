import React, { useEffect } from 'react'

const Logout = () => {
    const LogoutRequest = async () => {
        const response = await fetch("/logout",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        console.log(data)
        if(response.status === 200){
            window.location.href = "/"
        }
    }

    useEffect(() => {
        LogoutRequest();
    })
    return (
        <>
            <h1 style={{textAlign: "center",marginTop: "50px"}}>Logging you out please wait...</h1>
        </>
    )
}

export default Logout
