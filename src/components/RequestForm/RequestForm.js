
import {FormControl, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
export default function RequestForm() {
    return (
        <FormControl>
            <DatePicker label="Start date"/>
            <TextField type="text" label="Vacation days"></TextField>
            <DatePicker label="End date" ></DatePicker>
            <TextField type="text"></TextField>
        </FormControl>
    )
}