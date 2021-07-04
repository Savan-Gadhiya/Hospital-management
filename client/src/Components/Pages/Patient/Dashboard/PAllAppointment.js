import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { getPatientData } from '../../../Utility_Component/Utility functions';
import AllAppointments from '../../Shared/AllAppointments';
import { TableCell, TableRow } from '@material-ui/core';
import GiveAppointmentIcon from '../../../Utility_Component/GiveAppointmentIcon';
const PAllAppointment = () => {
  const [patientData, setPatientData] = useState({});
  const history = useHistory();
  // Fetch Patient Data which is loggedin
  const fetchPatientData = async () => {
    const response = await getPatientData();
    if (response.status === 200) {
      const data = response.data;
      console.log(data)
      setPatientData(data);
    }
    else {
      console.log("GO to PAtientDAshBOard")
      history.push("/dashboard/patient");
    }
  }

  useEffect(() => {
    fetchPatientData();
  }, [])

  const fetchURL = "/api/appointment/getforpatient";
  const TabelHeadCellForPatient = [
    { id: "sr.no", label: "Sr.No" },
    { id: "hospitalInfo", label: "Hospital Info" },
    { id: "medicalStatus", label: "Medical Status" },
    { id: "remarks", label: "Remarks" },
    { id: "appointmentHandleBy", label: "Appointment HandleBy" },
    { id: "medicine", label: "Medicines" },
    { id: "appoitmentTime", label: "Appoitment Time" },
    { id: "status", label: "Status" },
  ];
  const renderTableBodyForPatient = (valuesArr,page,rowsPerPages) => {
    console.log("Value Arr = ",valuesArr)
    return (
      valuesArr.map((appointment, index) => {
        return (
          <>
            <TableRow key={appointment._id}>
              <TableCell>{page*rowsPerPages + index + 1}</TableCell>
              <TableCell>{appointment.hospitalName} <br /> {appointment.hospitalEmail} <br />{appointment.hospitalPhone}</TableCell>
              {
                appointment.appointmentStatus === "close" ?
                  (
                    <>
                      <TableCell>{appointment.medicalStatus}</TableCell>
                      <TableCell>{appointment.remarks}</TableCell>
                      <TableCell>{appointment.staffName}</TableCell>
                      <TableCell style={{ paddingLeft: "5px" }}>
                        <ul>
                          {
                            appointment.medicine.map((ele, idx) => {
                              return ele ? <li key={idx}>{ele}</li> : "-"
                            })
                          }
                        </ul>
                      </TableCell>
                    </>
                  ) :
                  (
                    <>
                      <TableCell> - </TableCell>
                      <TableCell> - </TableCell>
                      <TableCell> - </TableCell>
                      <TableCell> - </TableCell>
                    </>
                  )
              }
              <TableCell>{new Date(appointment.appointmentTime).toLocaleString()}</TableCell>
              <TableCell>
                {GiveAppointmentIcon(appointment.appointmentStatus)}
              </TableCell>
            </TableRow>
          </>
        )
      })
    )
  }
  return (
    <>
      <AllAppointments fetchURL={fetchURL} TableHeadCell={TabelHeadCellForPatient} renderTableBody={renderTableBodyForPatient} />
    </>
  )
}

export default PAllAppointment;
