import {useEffect, useState} from "react";


export const useVacationDateLogic = (startDate, endDate, vacationDays, setVacationDays, setEndDate, endOfYear, setMaxDayCustomInput,setMaxEndDay, MAX_VACATION_DAYS) => {
    const [isManualEndDate, setIsManualEndDate] = useState(false);
    
    const calculatedEndDate = (start, days) => {
        return start.add(days, 'day').isAfter(endOfYear, 'day') ? endOfYear : start.add(days, 'day');
    }
    
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
                const inclusiveDaysUntilEndOfYear = daysUntilEndOfYear + 1;
                setMaxDayCustomInput(inclusiveDaysUntilEndOfYear);
               
            } 
            if(vacationDays > MAX_VACATION_DAYS) {
                setVacationDays(MAX_VACATION_DAYS);
                setMaxDayCustomInput(MAX_VACATION_DAYS);
            }

            const potentialMaxEndDate = startDate.add(MAX_VACATION_DAYS, 'day');
            const calculatedMaxEndDay = potentialMaxEndDate.isAfter(endOfYear)
                ? endOfYear
                : potentialMaxEndDate;

            setMaxEndDay(calculatedMaxEndDay);
            
            
            const newEndDate = calculatedEndDate(startDate, vacationDays);
            setEndDate(newEndDate);
            
        }
    }, [startDate, vacationDays, isManualEndDate, endOfYear, setEndDate, setVacationDays]);
    
    useEffect(() => {
        setIsManualEndDate(false);
    }, [startDate]);
}
