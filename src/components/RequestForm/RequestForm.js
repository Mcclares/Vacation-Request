import {useRef, useState} from "react";
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
import {useNavigation} from "../../hooks/useNavigation";
import {handleStartDateChange} from "../../utils/handleStartDateChange";
import {handleEndDateChange} from "../../utils/handleEndDateChange";
import {handleVacationDaysChange} from "../../utils/handleVacationDaysChange";
import postRequest from "../../api/postRequest";


const MAX_VACATION_DAYS = 27;

export default function RequestForm() {
    const today = dayjs();
    const tomorrow = today.add(1,'day');
    
    const endOfYear = today.endOf('year');
    const secondToLastDayOfYear = endOfYear.subtract(1, 'day');
    
    const [startDate, setStartDate] = useState(today);
    const nextDayAfterStartDate = startDate.add(1, 'day');
    
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(tomorrow);
    const [maxEndDay, setMaxEndDay] = useState(startDate.add(MAX_VACATION_DAYS, 'day'));
    const [comment, setComment] = useState('');
    const [maxValueCustomInput,setMaxValueCustomInput] = useState(MAX_VACATION_DAYS);
    const [isInvalidDate, setIsInvalidDate] = useState(false);
    
    const timeoutRef = useRef(null);

    const showAlert = useAlert();
    const goToPage = useNavigation();
    
    useTimeOutClearEffect(timeoutRef);
    useVacationDateLogic(startDate, endDate, vacationDays, setVacationDays, setEndDate, endOfYear, setMaxValueCustomInput,setMaxEndDay,setIsInvalidDate, MAX_VACATION_DAYS);

    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isInvalidDate) {
            
            postRequest(startDate,vacationDays,endDate,comment);
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
                                vacationDays,
                                endOfYear,
                                setVacationDays,
                                timeoutRef,
                                setStartDate,
                                setEndDate,
                              
                            )
                        }}
                        maxDate={secondToLastDayOfYear}
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
                            )
                        }}
                        maxValue={maxValueCustomInput}
                        required/>

                    <DatePicker
                        sx={FieldStyle}
                        label="End date"
                        minDate={nextDayAfterStartDate}
                        value={endDate}
                        defaultValue={tomorrow}
                        maxDate={maxEndDay}
                        onChange={(newDate)=> {
                            handleEndDateChange(
                                newDate,
                                startDate,
                                setEndDate,
                                setIsInvalidDate,
                                showAlert,
                                MAX_VACATION_DAYS
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
                    <CustomButton type="submit" name="Submit" onClick={handleSubmit} isError={isInvalidDate} variant="outlined" startIcon={<BeachAccessIcon/>} endIcon={<KiteSurfingIcon/>}/>

                </FormControl>
            </form>

        </LocalizationProvider>
    )
}