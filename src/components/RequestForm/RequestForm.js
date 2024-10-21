
import {FormControl, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
export default function RequestForm() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl>
                <DatePicker label="Start date"/>
                <TextField type="text" label="Vacation days"></TextField>
                <DatePicker label="End date" ></DatePicker>
                <TextField type="text"></TextField>
            </FormControl>
            
        </LocalizationProvider>
    )
}