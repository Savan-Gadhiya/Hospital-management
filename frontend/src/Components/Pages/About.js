import React, { useEffect, useState } from 'react'

const About = () => {
    const [Userdata, setUserData] = useState({});

    const [found, setFound] = useState(false);
    const fetchData = async () => {
        console.log("Request send");
        const response = await fetch('/api/about', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        const data = await response.json();
        console.log("data = ", data);
        if ("msg" in data) setFound(false);
        else setFound(true);
        setUserData(data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h1>About Page</h1>
            {/* {found ?
                <>
                    <p>Name: {Userdata.name}</p>
                    <p>Email: {Userdata.email}</p>
                    <p>Phone: {Userdata.phone}</p>
                    {("address" in Userdata) &&
                        <p>Address: {Userdata.address.address1},{Userdata.address.address2},{Userdata.address.city},{Userdata.address.state},{Userdata.address.country},{Userdata.address.pincode}</p>}
                    <p>dob: {Userdata.dob}</p>
                    <p>gender: {Userdata.gender}</p>
                </>
                : <h1>You need to login to access this page</h1>
            } */}
            {found ?
                <>
                    <p>Name: {Userdata.name}</p>
                    <p>Email: {Userdata.email}</p>
                    <p>Phone: {Userdata.phone}</p>
                    {("address" in Userdata) &&
                        <p>Address: {Userdata.address.address1},{Userdata.address.address2},{Userdata.address.city},{Userdata.address.state},{Userdata.address.country},{Userdata.address.pincode}</p>}
                </>
                : <h1>You need to login to access this page</h1>
            }
        </>
    )
}

export default About
