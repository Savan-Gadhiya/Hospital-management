import React, { useEffect, useState } from 'react'
import { Typography, Container, IconButton, Paper, Table, TableRow, TableCell, TableBody, makeStyles, TablePagination } from '@material-ui/core';
import { getHospitalData } from '../../Utility_Component/Utility functions';
import THead from '../../Utility_Component/TableHead';
import { useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import useTableStyle from '../../Utility_Component/TableStyle';

const DisplayAllStaff = () => {
  const [hospitalData, setHospitalData] = useState({});
  const [allEmployee, setAllEmployee] = useState([]);
  const defaultClasses = useTableStyle();
  // for pagination
  const pagesOption = [5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(pagesOption[page]);


  const FetchHospitalData = async () => {
    const response = await getHospitalData();
    if (response.status === 200) {
      const data = response.data;
      setHospitalData(data);
    }
    else {
      console.log("Error while faching data");
    }
  }

  const FetchEmployeeData = async () => {
    const response = await fetch("/api/staff/getstaff", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    if (response.status === 200) {
      setAllEmployee(data);
    }
    else {
      console.log("Get Data response with other than 200 status code");
    }
  }

  const TableHeadCell = [
    { id: "sr.no", label: "Sr.No" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "address", label: "Address" },
    { id: "position", label: "Position" },
    { id: "dob", label: "Date Of Birth" },
    { id: "salary", label: "Salary" },
    { id: "joiningDate", label: "Joining Date" },
  ]

  useEffect(() => {
    FetchHospitalData();
    FetchEmployeeData();
  }, []);

  // For Pagination
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowParPage = (e) => {
    const { name, value } = e.target;
    setRowsPerPages(value);
    setPage(0);
  }
  const recordAfterPagination = () => {
    return (allEmployee.slice(page * rowsPerPages, (page + 1) * rowsPerPages))
  }

  return (
    <>
      <Container style={{ margin: "20px 0px" }}>
        <Paper style={{ padding: "10px" }}>
          <Typography variant="h3" component="h1">All Employee</Typography>
          {allEmployee !== undefined && allEmployee.length ?
            (
              <>
                <Table className={defaultClasses.table}>
                  <THead TableHeadCell={TableHeadCell} />
                  <TableBody>
                    {
                      recordAfterPagination().map((staff, index) => (
                        <>
                        <TableRow>

                          <TableCell>{index + page * rowsPerPages + 1}</TableCell>
                          {/* dar pagination na page per index in value 0 thi start thashe atle aavu kariyu */}
                          <TableCell>{staff.name}</TableCell>
                          <TableCell>{staff.email}</TableCell>
                          <TableCell>{staff.phone}</TableCell>
                          <TableCell>{`${staff.address.address1} ${staff.address.city} ${staff.address.pincode}`}</TableCell>
                          <TableCell>{staff.role}</TableCell>
                          <TableCell>{new Date(staff.dob).toLocaleDateString()}</TableCell>
                          <TableCell>{staff.salary}</TableCell>
                          <TableCell>{new Date(staff.date).toLocaleDateString()}</TableCell> 
                          {/* This staff.date is added date value */}
                        </TableRow>
                        </>
                      ))
                    }
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  page={page}
                  rowsPerPageOptions={pagesOption}
                  rowsPerPage={rowsPerPages}
                  count={allEmployee.length}
                  onChangeRowsPerPage={handleChangeRowParPage}
                  onChangePage={handleChangePage}
                />
              </>
            ) : "You have not added any staff member"
          }
        </Paper>
      </Container>
    </>
  )
}

export default DisplayAllStaff;
