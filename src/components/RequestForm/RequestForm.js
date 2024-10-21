
import {FormControl, InputLabel, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";

export default function RequestForm() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl >
                <DatePicker  label="Start date"/>
                <CustomNumberInput  label="Vacation days" />
                <DatePicker  label="End date" ></DatePicker>
                <TextField 
                    multiline
                    rows={5} 
                    variant="outlined"
                    label="Comment"
                    helperText="Please leave your comments or suggestions."
                   />
            </FormControl>
            
        </LocalizationProvider>
    )
}