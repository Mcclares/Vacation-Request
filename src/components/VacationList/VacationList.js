import {Table, TableHead, TableCell, TableBody, Modal, Typography, Box, TableRow , TableContainer, Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import { tableStyle,tableCellStyle, commentModalTextStyle, modalStyle} from "./VacationListStyles";
import getRequests from "../../api/getRequests";
import { TableVirtuoso } from 'react-virtuoso';
import './VacationList.css';
import {getCursorStyle} from "../../utils/helpers";
import {columns} from "../columnsConfig";
import {fixedHeaderContent} from "../FixedHeaderContent/FixedHeaderContent";
import {rowContent} from "../RowContent/RowContent";
import {VirtuosoTableComponents} from "../VirtuosoTableComponents/VirtuosoTableComponents";

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
    
    return (
        <Paper style={{ height: 400, width: '60%', }}>
            <TableVirtuoso
                data={requests}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={(_index, row) => rowContent(handleCommentClick, row)}
                sx={{backgroundColor: "#EAE7DC"}}
            />
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-comment-title"
                aria-describedby="modal-comment-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-comment-description" sx={commentModalTextStyle}>
                        {selectedComment}
                    </Typography>
                </Box>
               
            </Modal>
        </Paper>
    );
}