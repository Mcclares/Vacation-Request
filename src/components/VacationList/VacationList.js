import {Table, TableHead, TableCell, TableBody} from "@mui/material";
import {TableRow} from "@mui/material";
import React, {useState} from "react";
import {tableHeader} from "./VacationListStyles";
export default function VacationList() {
    const[requests, setRequests] = useState([])
    const tableHeaderClass = "table-header";
    const tableClass = "table";
    
    
    return(
        <Table>
            <TableHead >
                <TableRow>
                    <TableCell style={tableHeader}>Start date</TableCell>
                    <TableCell style={tableHeader}>Vacation days</TableCell>
                    <TableCell style={tableHeader}>End date</TableCell>
                    <TableCell style={tableHeader}>Comment</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {requests.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell>{request.startDate}</TableCell>
                        <TableCell>{request.vacDays}</TableCell>
                        <TableCell>{request.endDate}</TableCell>
                        <TableCell>{request.comment}</TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>)
}