import {useEffect, useState} from "react";


export const useVacationDateLogic = (startDate, endDate, vacationDays, setVacationDays, setEndDate, endOfYear, setMaxDayCustomInput, MAX_VACATION_DAYS) => {
    const [isManualEndDate, setIsManualEndDate] = useState(false);
    
    useEffect(() => {
        if (endDate && endDate.isAfter(startDate, 'day') && endDate.isBefore(endOfYear)) {
            const daysDiff = endDate.diff(startDate, 'day');
            setVacationDays(daysDiff);
            setIsManualEndDate(true);
            }
    }, [endDate, startDate, setVacationDays]);
    
    useEffect(() => {
        if(!isManualEndDate && startDate && vacationDays) {
            const daysUntilEndOfYear = endOfYear.subtract(1,'day').diff(startDate, 'day');
            if(daysUntilEndOfYear < MAX_VACATION_DAYS) {
                if(vacationDays > daysUntilEndOfYear) {
                    setVacationDays(daysUntilEndOfYear);
                }
                setMaxDayCustomInput(daysUntilEndOfYear + 1);
               
            } 
            if(vacationDays > MAX_VACATION_DAYS) {
                setVacationDays(MAX_VACATION_DAYS);
                setMaxDayCustomInput(MAX_VACATION_DAYS);
            }
            
            const calculatedEndDate = startDate.add(vacationDays , 'day');
            
            if (calculatedEndDate.isAfter(endOfYear, 'day')) {
                setEndDate(endOfYear);
            } else {
                setEndDate(calculatedEndDate);
            }
        }
    }, [startDate, vacationDays, isManualEndDate, endOfYear, setEndDate, setVacationDays]);
    
    useEffect(() => {
        setIsManualEndDate(false);
    }, [startDate]);
}
