import {useEffect, useRef, useState} from "react";
import {FormControl, InputLabel, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import {FieldStyle} from "./RequestFormStyle";
import dayjs from "dayjs";
import useCalculateVacationDays from "../../hooks/useCalculateVacationDays";
import useCalculateEndDate from "../../hooks/useCalculateEndDate";

const MAX_VACATION_DAYS = 28;

export default function RequestForm() {

    const today = dayjs();
    const tomorrow = today.add(1,'day');
    const endOfYearEndDate = today.endOf('year');
    const endOfYearStartDate = today.endOf('year').subtract(1,'day');
    const currentYear = today.year();
    
    const [startDate, setStartDate] = useState(today);
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(tomorrow);
    
    const remainingDaysInYear = endOfYearEndDate.diff(startDate, 'day')
    const maxVacationDays = Math.min(MAX_VACATION_DAYS, remainingDaysInYear)

    
    const timeoutRef = useRef(null);
    
    useEffect(() => {
        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    })
    
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
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            if (newStartDate && newStartDate.isAfter(today, 'day') && newStartDate.isBefore(endOfYearStartDate, 'day')) {
                setStartDate(newStartDate);
                setEndDate(newStartDate.add(vacationDays, 'day'));
            } else if (newStartDate) {
                setStartDate(today);
                setVacationDays(1);
                setEndDate(tomorrow);
            }
        }, 1500);
        
    }
    
    const handleEndDateChange = (newDate) => {
        const newEndDate = newDate ? dayjs(newDate) : null;
        
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            if(newEndDate && newEndDate.isAfter(tomorrow, 'day') && newEndDate.isBefore(endOfYearEndDate, 'day')) {
                setEndDate(newEndDate);
                
            }else if(newEndDate) {
                setEndDate(tomorrow);
            }
         },1500)
       
    }
    
    
    const handleVacationDaysChange = (value) => {
        const days = value;
        if (!isNaN(days)) {
            setVacationDays(days); 
        } else {
           
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
                    maxValue={maxVacationDays}
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