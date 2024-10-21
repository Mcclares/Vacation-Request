import {useEffect, useState} from "react";
import {FormControl, InputLabel, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import {FieldStyle} from "./RequestFormStyle";
import dayjs from "dayjs";
import useVacationDays from "../../hooks/useVacationDays";
export default function RequestForm() {
    const today = dayjs();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [vacationDays, setVacationDays] = useVacationDays(startDate,endDate)
    const [vacationDays, setVacationDays] = useState(0);

    useEffect(() => {
        if(startDate && endDate) {
            const daysDiff = endDate.diff(startDate, 'day');
            setVacationDays(daysDiff);
        }
    }, [startDate, endDate]);
    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    }
    const handleEndDateChange = (newDate) => {
        setEndDate(newDate)
    }
    const handleVacationDaysChange = (event) => {
        const days = parseInt(event.target.value, 10 ) || 1 ;
        console.log('Setting vacation days to:', days);
        setVacationDays(days);
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
                    required/>
                <DatePicker 
                    sx={FieldStyle}  
                    label="End date" 
                    minDate={today}
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