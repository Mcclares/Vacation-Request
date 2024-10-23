﻿import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";

import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import KiteSurfingIcon from '@mui/icons-material/Kitesurfing';

import {FormControl, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {FieldStyle} from "./RequestFormStyle";

import CustomButton from "../Button/СustomButton";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";

import {useAlert} from "../../hooks/useAlert";
import {useTimeOutClearEffect} from "../../hooks/useTimeOutClearEffect";
import {useVacationDateLogic} from "../../hooks/useVacationDateLogic";

import {handleNavigation} from "../../utils/handleNavigation";
import {handleStartDateChange} from "../../utils/handleStartDateChange";
import {handleEndDateChange} from "../../utils/handleEndDateChange";
import {handleVacationDaysChange} from "../../utils/handleVacationDaysChange";

import postRequest from "../../api/postRequest";

const MAX_VACATION_DAYS = 28;

export default function RequestForm() {
    
    const today = dayjs();
    const tomorrow = today.add(1,'day');
    
    const endOfYearEndDate = today.endOf('year');
    const endOfYearStartDate = today.endOf('year').subtract(1,'day');
    
    const [startDate, setStartDate] = useState(today);
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(tomorrow);
    const [maxEndDay, setMaxEndDay] = useState(startDate.add(MAX_VACATION_DAYS, 'day'));
    
    const nextDayAfterStartDay = startDate.add(1,'day');
    
    const [comment, setComment] = useState('');
    

    const [isErrorInDates, setIsErrorInDates] = useState(false);
    const timeoutRef = useRef(null);

    const showAlert = useAlert();
    const goToPage = handleNavigation();
    
    useTimeOutClearEffect(timeoutRef);
    useVacationDateLogic(startDate, endDate, vacationDays, setVacationDays, setEndDate, setIsErrorInDates);

    useEffect(() => {
        const intervalYear = startDate.add(1,'year');
        const potentialMaxEndDate = startDate.add(MAX_VACATION_DAYS, 'day');
        const calculatedMaxEndDay = potentialMaxEndDate.isAfter(intervalYear)
            ? intervalYear : potentialMaxEndDate;
        setMaxEndDay(calculatedMaxEndDay);
    }, [startDate]);
    
    
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isErrorInDates) {
            
            postRequest(startDate,vacationDays,endDate);
            showAlert("Form submitted successfully", "success");
            goToPage("/");

        }else {
            showAlert("Error: Invalid date selection", "error")
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
                        defaultValue={today}
                        value={startDate}
                        onChange={(newDate) => {
                            handleStartDateChange(
                                newDate,
                                today,
                                startDate.add(1,'year'),
                                startDate.add(1,'year').subtract(1,'day'),
                                MAX_VACATION_DAYS,
                                vacationDays,
                                setVacationDays,
                                timeoutRef,
                                setStartDate,
                                setEndDate,
                                setMaxEndDay,
                                setIsErrorInDates,
                                tomorrow
                            )
                        }}
                        maxDate={startDate.add(1,'year')}
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
                        onChange={(days) => {
                            handleVacationDaysChange(
                                days,
                                startDate,
                                setEndDate,
                                setVacationDays,
                                maxEndDay,
                                setMaxEndDay
                            )
                        }}
                        maxValue={MAX_VACATION_DAYS}
                        required/>

                    <DatePicker
                        sx={FieldStyle}
                        label="End date"
                        minDate={startDate.add(1,'day')}
                        value={endDate}
                        defaultValue={tomorrow}
                        maxDate={maxEndDay}
                        onChange={(newDate)=> {
                            handleEndDateChange(
                                newDate,
                                startDate,
                                maxEndDay,
                                setEndDate,
                                setIsErrorInDates
                            )
                        } }
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

        </LocalizationProvider>
    )
}