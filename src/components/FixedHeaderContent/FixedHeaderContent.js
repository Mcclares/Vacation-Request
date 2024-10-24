import {columns} from "../columnsConfig";
import {TableRow, TableCell} from "@mui/material";
import {tableHeaderStyle} from "./FixedHeaderContentStyle";

export function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={tableHeaderStyle}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}