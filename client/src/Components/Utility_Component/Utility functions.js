export const getPatientData = async () => {
    const response = await fetch("/api/patient/authenticate", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Conetent-Type": "application/json"
        },
        credentials: "include"
    });
    const data = await response.json();
    // console.log(data);
    return {status: response.status,data: data}

}