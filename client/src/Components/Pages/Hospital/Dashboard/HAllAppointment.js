import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { getHospitalData } from '../../../Utility_Component/Utility functions';
import AllAppointments from '../../Shared/AllAppointments';
import { TableCell, TableRow } from '@material-ui/core';
import GiveAppointmentIcon from '../../../Utility_Component/GiveAppointmentIcon';

const HAllAppointment = () => {
  const history = useHistory();
  const [HospitalData, setHospitalData] = useState({});
  //  Fetch a hospital data which is logeddin
  const fetchHospitalData = async () => {
    const response = await getHospitalData();
    if (response.status === 200) {
      const data = response.data;
      console.log("Hospital ID = ", data);
      setHospitalData(data);
    }
    else {
      history.push("/dashboard/hospital");
    }
  }

  useEffect(() => {
    fetchHospitalData();
  }, [])

  const fetchURL = "/api/appointment/getforhospital";
  const TableHeadCellForHospital = [
    { id: "sr.no", label: "Sr.No" },
    { id: "patientInfo", label: "Patient Info" },
    { id: "medicalStatus", label: "Medical Status" },
    { id: "remarks", label: "Remarks" },
    { id: "appointmentHandleBy", label: "Appointment HandleBy" },
    { id: "medicine", label: "Medicines" },
    { id: "appoitmentTime", label: "Appoitment Time" },
    { id: "status", label: "Status" },
  ];
  const renderTableBodyForHospital = (valuesArr) => {
    console.log("Value Arr = ", valuesArr)
    return (
      valuesArr.map((appointment, index) => {
        return (
          <>
            <TableRow key={appointment._id}>
              <TableCell>{index + 1}</TableCell>
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
      <AllAppointments fetchURL={fetchURL} TableHeadCell={TableHeadCellForHospital} renderTableBody={renderTableBodyForHospital} />
    </>
  )
}

export default HAllAppointment;
