
import {FormControl, TextField,} from "@mui/material";

export default function RequestForm() {
    return (
        <FormControl>
            <TextField type="date" label="Start date"/>
            <TextField type="text" label="Vacation days"></TextField>
            <TextField type="date" label="End Date"></TextField>
            <TextField type="text"></TextField>
        </FormControl>
    )
}