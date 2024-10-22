import {useEffect, useRef, useState} from "react";
import {FormControl, InputLabel, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import {FieldStyle} from "./RequestFormStyle";
import dayjs from "dayjs";
import CustomButton from "../Button/СustomButton";
import useCalculateVacationDays from "../../hooks/useCalculateVacationDays";
import useCalculateEndDate from "../../hooks/useCalculateEndDate";

const MAX_VACATION_DAYS = 28;

export default function RequestForm() {

    const today = dayjs();
    const tomorrow = today.add(1,'day');
    
    
    const endOfYearEndDate = today.endOf('year');
    const endOfYearStartDate = today.endOf('year').subtract(1,'day');
    
    const [startDate, setStartDate] = useState(today);
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(tomorrow);
    
    const nextDayAfterStartDay = startDate.add(1,'day');
    
    // const remainingDaysInYear = endOfYearEndDate.diff(startDate, 'day')
    // const maxVacationDays = Math.min(MAX_VACATION_DAYS, remainingDaysInYear)
    const [maxEndDay, setMaxEndDay] = useState(startDate.add(MAX_VACATION_DAYS, 'day'));
    
    const timeoutRef = useRef(null);
    
    useEffect(() => {
        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    })

    useEffect(() => {
        if(endDate && endDate.isAfter(startDate,'day')) {
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
                
                const potentialMaxEndDate = newStartDate.add(MAX_VACATION_DAYS, 'day');
                const maxEndDate = potentialMaxEndDate.isAfter(endOfYearEndDate) ? endOfYearEndDate : potentialMaxEndDate;
                setMaxEndDay(maxEndDate)
                setEndDate(newStartDate.add(vacationDays, 'day'));
                
            } else if (newStartDate) {
                setStartDate(today);
                setVacationDays(1);
                setEndDate(tomorrow);
                setMaxEndDay(endOfYearEndDate);
            }
        }, 1500);
        
    }
    
    const handleEndDateChange = (newDate) => {
        const newEndDate = newDate ? dayjs(newDate) : null;
        if(newEndDate && newEndDate.isAfter(startDate, 'day') && newEndDate.isBefore(endOfYearEndDate, 'day')) {
            setEndDate(newEndDate);
           
        }
    }
    
    
    const handleVacationDaysChange = (days) => {
        if (!isNaN(days)) {
            setEndDate(startDate.add(days, 'day'));
            setVacationDays(days); 
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
                    maxValue={MAX_VACATION_DAYS}
                    required/>
                    
                <DatePicker
                    
                    sx={FieldStyle}
                    label="End date" 
                    minDate={nextDayAfterStartDay}
                    value={endDate}
                    maxDate={maxEndDay}
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
                <CustomButton name="Submit"/>
                
            </FormControl>
            
        </LocalizationProvider>
    )
}