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
    const [tempStartDate, setTempStartDate] = useState(null);
    
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
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        console.log('New Start Date:', newStartDate?.format('DD/MM/YYYY'));
        
        timeoutRef.current = setTimeout(() => {
            if (newStartDate) {
                if (newStartDate.isBefore(today, 'day')) {
                    console.log('Invalid start date. It is before today. Resetting to today:', today.format('DD/MM/YYYY'));
                    setStartDate(today);
                } else if (newStartDate.isAfter(endOfYearStartDate, 'year')) {
                    console.log('Invalid start date. It is after the end of the year. Resetting to today:', today.format('DD/MM/YYYY'));
                    
                    setStartDate(today);
                } else {
                    console.log('Valid start date set:', newStartDate.format('DD/MM/YYYY'));
                    setStartDate(newStartDate);
                }
            } else {
                console.log('New start date is null or invalid.');
            }
        },3000)
       
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