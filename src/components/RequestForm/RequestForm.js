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
    const tommorow = today.add(1,'day');
    
    const [startDate, setStartDate] = useState(today);
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(today);
    
    
    useEffect(() => {
        if(endDate) {
            const daysDiff = endDate.diff(startDate, 'day');
            setVacationDays(daysDiff);
        }

    }, [endDate, startDate])

    useEffect(() => {
        if(startDate && vacationDays) {
            const calculatedEndDate = startDate.add(vacationDays, 'day');
            setEndDate(calculatedEndDate)
        }
    },[startDate,vacationDays])
    
    const handleStartDateChange = (newDate) => {
        const newStartDate = newDate ? dayjs(newDate) : null;
        setStartDate(newStartDate);
        if(newStartDate) {
            const calculatedEndDate = newStartDate.add(vacationDays, 'day');
            setEndDate(calculatedEndDate)
        }
       
    }
    const handleEndDateChange = (newDate) => {
        const newEndDate = newDate ? dayjs(newDate) : null;
        if(newEndDate && newEndDate.isBefore(tommorow, 'day')) {
            setEndDate(tommorow);
        }else {
            setEndDate(newEndDate);
        }
       
    }
    const handleVacationDaysChange = (value) => {
        const days = value;
        if (!isNaN(days)) {
            setVacationDays(days); 
        } else {
            console.error('Get undefined');
        }
    };
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl >
                <DatePicker 
                    sx={FieldStyle} 
                    label="Start date" 
                    minDate={today} 
                    value={startDate}
                    onChange={handleStartDateChange}
                    required/>
                <CustomNumberInput 
                    sx={FieldStyle}  
                    label="Vacation days"
                    newValue={vacationDays}
                    onChange={handleVacationDaysChange}
                    required/>
                <DatePicker 
                    sx={FieldStyle}  
                    label="End date" 
                    minDate={tommorow}
                    value={endDate}
                    onChange={handleEndDateChange}
                    required/>
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