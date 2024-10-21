
import {FormControl, InputLabel, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import {FieldStyle} from "./RequestFormStyle";
import dayjs from "dayjs";
export default function RequestForm() {
    const today = dayjs();
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl >
                <DatePicker sx={FieldStyle} label="Start date" minDate={today}/>
                <CustomNumberInput sx={FieldStyle}  label="Vacation days" />
                <DatePicker sx={FieldStyle}  label="End date" minDate={today} ></DatePicker>
                <TextField 
                    multiline
                    rows={5} 
                    variant="outlined"
                    label="Comment"
                    helperText="Please leave your comments or suggestions."
                    sx={FieldStyle}
                   />
            </FormControl>
            
        </LocalizationProvider>
    )
}