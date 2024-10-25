import {TableCell} from "@mui/material";
import {tableCellStyle} from "./RowContentStyle";
import {getCursorStyle} from "../../utils/helpers";
import {columns} from "../columnsConfig";
import React from "react";

export function rowContent(handleCommentClick, row) {
    if(!row) {
        return null;
    }
    
    
    return (
        <React.Fragment>
            {columns.map((column) => {
                const cellValue = row[column.dataKey];
                
                return (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric ? 'right' : 'left'}
                    onClick={
                        column.dataKey === 'comment' && cellValue?.trim() !== ''
                            ? () => handleCommentClick(cellValue)
                            : null
                    }
                    style={{cursor: getCursorStyle(column, row)}}
                    sx={tableCellStyle}
                >
                    {row[column.dataKey]}
                </TableCell>);
                    
            })}
        </React.Fragment>
    );
}