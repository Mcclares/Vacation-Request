import {Table, TableHead, TableCell, TableBody} from "@mui/material";
import {TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {tableHeader, styledTable} from "./VacationListStyles";
import getRequests from "../../api/getRequests";
export default function VacationList() {
    const[requests, setRequests] = useState([]);
    
    useEffect(() => {
        const storedRequests = getRequests();
        setRequests(storedRequests);
    },[])
    
    return(
        <Table style={styledTable}>
            <TableHead >
                <TableRow>
                    <TableCell style={tableHeader}>ID</TableCell>
                    <TableCell style={tableHeader}>Start date</TableCell>
                    <TableCell style={tableHeader}>Vacation days</TableCell>
                    <TableCell style={tableHeader}>End date</TableCell>
                    <TableCell style={tableHeader}>Comment</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>{request.id}</TableCell>
                            <TableCell>{request.startDate}</TableCell>
                            <TableCell>{request.vacationDays}</TableCell>
                            <TableCell>{request.endDate}</TableCell>
                            <TableCell>{request.comment}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="4">No requests found</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>)
}


