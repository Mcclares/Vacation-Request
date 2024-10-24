import {Table, TableHead, TableCell, TableBody, Modal, Typography, Box} from "@mui/material";
import {TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {tableHeader, table,tableCell} from "./VacationListStyles";
import getRequests from "../../api/getRequests";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import './VacationList.css';

const columns = [
    {
        width: 100,
        label: 'Start Date',
        dataKey: 'startDate',
    },
    {
        width: 100,
        label: 'Vacation Days',
        dataKey: 'vacationDays',
        numeric: true,
    },
    {
        width: 100,
        label: 'End Date',
        dataKey: 'endDate',
    },
    {
        width: 200,
        label: 'Comment',
        dataKey: 'comment',
    },
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
        console.log("click");
        console.log()
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
                        onClick={column.dataKey === 'comment' ? () => handleCommentClick(row[column.dataKey]) : null}
                        style={{ cursor: column.dataKey === 'comment' ? 'pointer': 'default'}}
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
                <Box sx={style}>
                    <Typography id="modal-comment-description" sx={{ mt: 2 }}>
                        {selectedComment}
                    </Typography>
                </Box>
               
            </Modal>
        </Paper>
    );
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#262a2b',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white'
};

