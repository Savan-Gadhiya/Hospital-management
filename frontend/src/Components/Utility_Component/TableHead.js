import {  TableHead, TableRow, TableCell } from '@material-ui/core';
import React from 'react'

const THead = ({TableHeadCell}) => {
    return (
        <>  
            <TableHead>
                <TableRow>
                    {
                        TableHeadCell.map((ele, idx) => (
                            <TableCell key={ele.id}>{ele.label}</TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        </>
    )
}

export default THead
