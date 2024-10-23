import {useEffect, useRef, useState} from "react";
import {HandleNavigation} from "../../utils/HandleNavigation";
import {FormControl, InputLabel, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import {FieldStyle} from "./RequestFormStyle";
import dayjs from "dayjs";
import CustomButton from "../Button/СustomButton";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import KiteSurfingIcon from '@mui/icons-material/Kitesurfing';

import {useAlert} from "../../hooks/useAlert";
import {Collapse} from "@mui/material";
import {Alert, Snackbar} from "@mui/material";

import useCalculateVacationDays from "../../hooks/useCalculateVacationDays";
import useCalculateEndDate from "../../hooks/useCalculateEndDate";

const MAX_VACATION_DAYS = 28;

export default function RequestForm() {

    const showAlert = useAlert();
    
    const [openAlertMessage, setOpenAlertMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    
    
    
    const goToPage = HandleNavigation();
    
    const today = dayjs();
    const tomorrow = today.add(1,'day');
    
    const endOfYearEndDate = today.endOf('year');
    const endOfYearStartDate = today.endOf('year').subtract(1,'day');
    
    const [isErrorInDates, setIsErrorInDates] = useState(false);
    
    const [startDate, setStartDate] = useState(today);
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(tomorrow);
    
    const nextDayAfterStartDay = startDate.add(1,'day');
    
    const [comment, setComment] = useState('');
    
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
    },[])

    useEffect(() => {
        if(endDate && endDate.isAfter(startDate,'day')) {
            const daysDiff = endDate.diff(startDate, 'day');
            setVacationDays(daysDiff);
            setIsErrorInDates(false);
        }

    }, [endDate, startDate])

    useEffect(() => {
        if(startDate && vacationDays) {
            const calculatedEndDate = startDate.add(vacationDays, 'day');
            setEndDate(calculatedEndDate)
            setIsErrorInDates(false);
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
                setIsErrorInDates(false);
                
            } else if (newStartDate) {
                setStartDate(today);
                setVacationDays(1);
                setEndDate(tomorrow);
                setMaxEndDay(endOfYearEndDate);
                setIsErrorInDates(false);
            }
        }, 500);
        
    }
    
    const handleEndDateChange = (newDate) => {
        const newEndDate = newDate ? dayjs(newDate) : null;
        if(newEndDate && newEndDate.isAfter(startDate, 'day') && newEndDate.isBefore(endOfYearEndDate, 'day')) {
            setEndDate(newEndDate);
        }else {
            setIsErrorInDates(true);
        }
    }
    
    
    const handleVacationDaysChange = (days) => {
        if (!isNaN(days)) {
            setEndDate(startDate.add(days, 'day'));
            setVacationDays(days);
            setMaxEndDay(maxEndDay);
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isErrorInDates) {

            const requestId = Date.now();
            const formData = {
                id: requestId,
                startDate: startDate.format("DD/MM/YYYY"),
                vacationDays: vacationDays,
                endDate: endDate.format("DD/MM/YYYY")
            }
            const existingRequest = JSON.parse(localStorage.getItem('vacationRequests')) || [];
            existingRequest.push(formData);
            console.log(existingRequest);
            localStorage.setItem('vacationRequests', JSON.stringify(existingRequest));
            
            showAlert("Form submitted successfully","success");
            setAlertMessage("Form submitted successfully");
            setAlertSeverity("success");
            setOpenAlertMessage(true);
            console.log(openAlertMessage);
            console.log(alertMessage);
            console.log(alertSeverity);

            goToPage("/");

        }else {
            setAlertMessage("Error: Invalid date selection");
            setAlertSeverity("error");
            setOpenAlertMessage(true);
        }

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        label="Comment"
                        helperText="Please leave your comments or suggestions."
                        sx={FieldStyle}
                    />
                    <CustomButton type="submit" name="Submit" onClick={handleSubmit} isError={isErrorInDates} variant="outlined" startIcon={<BeachAccessIcon/>} endIcon={<KiteSurfingIcon/>}/>

                </FormControl>
            </form>
            {/* Snackbar для отображения Alert */}
            <Snackbar
                open={openAlertMessage}
                autoHideDuration={6000}  // Snackbar автоматически закрывается через 6 секунд
                onClose={() => setOpenAlertMessage(false)}  // Закрываем Snackbar вручную
            >
                <Alert
                    onClose={() => setOpenAlertMessage(false)}
                    severity={alertSeverity}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </LocalizationProvider>
    )
}