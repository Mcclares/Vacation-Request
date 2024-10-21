import {useEffect, useState} from "react";
import {FormControl, InputLabel, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import {FieldStyle} from "./RequestFormStyle";
import dayjs from "dayjs";
import useCalculateVacationDays from "../../hooks/useCalculateVacationDays";
import useCalculateEndDate from "../../hooks/useCalculateEndDate";
export default function RequestForm() {
    const today = dayjs();
    const [startDate, setStartDate] = useState(null);
    const [vacationDays, setVacationDays] = useState(0);
    const [endDate,setEndDate] = useState(null);
    const [isManualDaysInput, setIsManualDaysInput] = useState(false);
    
    const [calculatedEndDate] = useCalculateEndDate(startDate,vacationDays)
    const [calculatedVacationDays] = useCalculateVacationDays(startDate,endDate)
    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
        setIsManualDaysInput(false);
    }
    const handleEndDateChange = (newDate) => {
        setEndDate(newDate)
        setIsManualDaysInput(false);
    }
    const handleVacationDaysChange = (event) => {
        const days = parseInt(event.target.value, 10 ) || 1 ;
        setVacationDays(days);
        setIsManualDaysInput(true);
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl >
                <DatePicker 
                    sx={FieldStyle} 
                    label="Start date" 
                    minDate={today} 
                    onChange={handleStartDateChange}
                    required/>
                <CustomNumberInput 
                    sx={FieldStyle}  
                    label="Vacation days"
                    onChange={handleVacationDaysChange}
                    value={isManualDaysInput ? vacationDays : calculatedVacationDays}
                    required/>
                <DatePicker 
                    sx={FieldStyle}  
                    label="End date" 
                    minDate={today}
                    value={calculatedVacationDays}
                    onChange={handleEndDateChange}
                    required></DatePicker>
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