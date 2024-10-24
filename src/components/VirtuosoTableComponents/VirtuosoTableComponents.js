import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody } from "@mui/material";
import {tableStyle} from "../VacationList/VacationListStyles";

export const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} className='table-container' />
    )),
    Table: (props) => (
        <Table {...props} sx={tableStyle} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};