import {Table, TableHead, TableCell, TableBody, Modal, Typography, Box, TableRow , TableContainer, Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {tableHeader, table,tableCell, commentModalText, modalStyle} from "./VacationListStyles";
import getRequests from "../../api/getRequests";
import { TableVirtuoso } from 'react-virtuoso';
import './VacationList.css';
import {getCursorStyle} from "../../utils/helpers";

const columns = [
    { width: 100, label: 'Start Date', dataKey: 'startDate' },
    { width: 100, label: 'Vacation Days', dataKey: 'vacationDays', numeric: true },
    { width: 100, label: 'End Date', dataKey: 'endDate' },
    { width: 200, label: 'Comment', dataKey: 'comment' }
];


const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} className='table-container' s />
    )),
    Table: (props) => (
        <Table {...props} sx={table} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return(
        <TableRow>
            {columns && columns.map((column) => (
                <TableCell
                key={column.dataKey}
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={tableHeader}
                >
                    {column.label}    
                </TableCell>
                ) 
            )}
        </TableRow>
    )
}


export default function VacationList() {
    const[requests, setRequests] = useState([]);
    const[openModal, setOpenModal] = useState(false);
    const[selectedComment, setSelectedComment] = useState('');
    
    useEffect(() => {
        const storedRequests = getRequests();
        setRequests(storedRequests);
    },[])
    
    const handleCommentClick = (comment) => {
        setSelectedComment(comment);
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    function rowContent(_index, row) {
        return (
            <React.Fragment>
                { columns && columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? 'right' : 'left'}
                        onClick={column.dataKey === 'comment' && row[column.dataKey] && row[column.dataKey].trim() !== '' ? () => handleCommentClick(row[column.dataKey]) : null}
                        style={{cursor : getCursorStyle(column,row)}}
                        sx={tableCell}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }
    
    return (
        <Paper style={{ height: 400, width: '60%', }}>
            <TableVirtuoso
                data={requests}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
                sx={{backgroundColor: "#EAE7DC"}}
            />
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-comment-title"
                aria-describedby="modal-comment-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-comment-description" sx={commentModalText}>
                        {selectedComment}
                    </Typography>
                </Box>
               
            </Modal>
        </Paper>
    );
}