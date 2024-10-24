import {TableCell} from "@mui/material";
import {tableCellStyle} from "./RowContentStyle";
import {getCursorStyle} from "../../utils/helpers";
import {columns} from "../columnsConfig";
import React from "react";

export function rowContent(handleCommentClick, row) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric ? 'right' : 'left'}
                    onClick={
                        column.dataKey === 'comment' && row[column.dataKey]?.trim() !== ''
                            ? () => handleCommentClick(row[column.dataKey])
                            : null
                    }
                    style={{ cursor: getCursorStyle(column, row) }}
                    sx={tableCellStyle}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}