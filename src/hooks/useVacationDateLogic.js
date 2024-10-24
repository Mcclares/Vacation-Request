import {useEffect, useState} from "react";


export const useVacationDateLogic = (
    startDate, 
    endDate, 
    vacationDays, 
    setVacationDays, 
    setEndDate, 
    endOfYear, 
    setMaxDayCustomInput, 
    MAX_VACATION_DAYS
) => {
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
            
            const adjustedVacationDays = Math.min(vacationDays,MAX_VACATION_DAYS, daysUntilEndOfYear);
            setVacationDays(adjustedVacationDays)
            setMaxDayCustomInput(adjustedVacationDays);
            
            const newEndDate = calculatedEndDate(startDate, )
            setEndDate(newEndDate);
        }
    }, [startDate, vacationDays, isManualEndDate, endOfYear, setEndDate, setVacationDays,setMaxDayCustomInput]);
    
    useEffect(() => {
        setIsManualEndDate(false);
    }, [startDate]);
}
