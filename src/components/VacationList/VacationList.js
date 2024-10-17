import {Table, TableHead, TableCell, TableBody} from "@mui/material";
import {TableRow} from "@mui/material";

import React from "react";


export default function VacationList() {
    const[requests, setRequests] = useState([])
    
    
    return(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Start date</TableCell>
                    <TableCell>Vacation days</TableCell>
                    <TableCell>End date</TableCell>
                    <TableCell>Comment</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {requests.map((request) => (
                    <TableRow>
                        <TableCell>{request.startDate}</TableCell>
                        <TableCell>{request.vacDays}</TableCell>
                        <TableCell>{request.endDate}</TableCell>
                        <TableCell>{request.comment}</TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>)
}