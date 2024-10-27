import {useRef, useState} from "react";
import dayjs from "dayjs";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import KiteSurfingIcon from '@mui/icons-material/Kitesurfing';
import {FormControl, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FieldStyle} from "./RequestFormStyle";
import CustomButton from "../CustomButton/CustomButton";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import {useAlert} from "../../hooks/useAlert";
import {useTimeOutClearEffect} from "../../hooks/useTimeOutClearEffect";
import {useVacationDateLogic} from "../../hooks/useVacationDateLogic";
import {useNavigation} from "../../hooks/useNavigation";
import {handleEndDateChange, handleStartDateChange} from "../../utils/handleChangingDates";
import postRequest from "../../api/postRequest";


const MAX_VACATION_DAYS = 28;


async function postData(startDate,vacationDays,endDate,comment) {
    postRequest(startDate,vacationDays,endDate,comment)
}

export default function RequestForm() {
    const today = dayjs();
    
    const endOfYear = today.endOf('year');
    const [startDate, setStartDate] = useState(today);
    const [vacationDays, setVacationDays] = useState(1);
    const [endDate,setEndDate] = useState(today.add(1, 'day'));
    const [comment, setComment] = useState('');
    const [maxValueInCustomInput,setMaxValueInCustomInput] = useState(MAX_VACATION_DAYS);
    const [isInvalidDate, setIsInvalidDate] = useState(false);
    
    const timeoutRef = useRef(null);
    const showAlert = useAlert();
    const goToPage = useNavigation();
    
    useTimeOutClearEffect(timeoutRef);
    useVacationDateLogic(
        startDate,
        vacationDays, 
        setVacationDays, 
        setEndDate, 
        endOfYear, 
        setMaxValueInCustomInput,
        MAX_VACATION_DAYS,
        );

    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isInvalidDate) {
            
            postData(startDate, vacationDays, endDate, comment).then(r  => console.log(r));
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
                                setIsInvalidDate,
                                showAlert
                              
                            )
                        }}
                     
                        maxDate={endOfYear}
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
                        onChange={setVacationDays}
                        maxValue={maxValueInCustomInput}
                        showAlert={showAlert}
                        setIsInvalidDate={setIsInvalidDate}
                        
                        required/>

                    <DatePicker
                        sx={FieldStyle}
                        label="End date"
                        minDate={startDate}
                        value={endDate}
                        defaultValue={today}
                        maxDate={endOfYear}
                        onChange={(newDate)=> {
                            handleEndDateChange(
                                newDate,
                                vacationDays,
                                startDate,
                                maxValueInCustomInput,
                                setStartDate,
                                setVacationDays,
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
                    <CustomButton type="submit" name="Submit" onClick={handleSubmit} isInvalidDate={isInvalidDate} variant="outlined" startIcon={<BeachAccessIcon/>} endIcon={<KiteSurfingIcon/>}/>

                </FormControl>
            </form>

        </LocalizationProvider>
    )
}