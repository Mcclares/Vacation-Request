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
    const tomorrow = today.add(1,'day');
    const endOfYearEndDate = today.endOf('year');
    const endOfYearStartDate = today.endOf('year').subtract(1,'day');
    
    const [startDate, setStartDate] = useState(today);
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(tomorrow);
    
    
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
        
        if(newStartDate && newStartDate.isBefore(today, 'day')) {
            setStartDate(today);
            const calculatedEndDate = today.add(vacationDays, 'day');
            setEndDate(calculatedEndDate)
        }else if (newStartDate && newStartDate.isAfter(endOfYearStartDate, 'year')) {
            setStartDate(today)
        } else if(newStartDate) {
            setStartDate(newStartDate);
            const calculatedEndDate = newStartDate.add(vacationDays, 'day');
            setEndDate(calculatedEndDate)
        }
       
    }
    
    const handleEndDateChange = (newDate) => {
        const newEndDate = newDate ? dayjs(newDate) : null;
        
        if(newEndDate && newEndDate.isBefore(tomorrow, 'day')) {
            setEndDate(tomorrow);
        } else if (newEndDate && newEndDate.isAfter(endOfYearEndDate, 'year')){
            setEndDate(tomorrow);
        }else if(newEndDate) {
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
                    maxDate={endOfYearStartDate}
                    format={"DD/MM/YY"}
                    slotProps={{
                        textField: {
                            helperText: `DD/MM/YY`,
                           
                        },
                    }}
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
                    minDate={tomorrow}
                    value={endDate}
                    maxDate={endOfYearEndDate}
                    onChange={handleEndDateChange}
                    format={"DD/MM/YY"}
                    slotProps={{
                        textField: {
                            helperText: `DD/MM/YY`,
                        },
                    }}
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