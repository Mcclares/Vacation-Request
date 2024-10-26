import {useEffect} from "react";

function calculatedEndDate(startDate, vacationDays, setEndDate, endOfYear) {
    const newEndDate = startDate.add(vacationDays - 1, 'day');
    setEndDate(newEndDate.isAfter(endOfYear) ? endOfYear : newEndDate);
}

export const useVacationDateLogic = (startDate, 
                                     vacationDays, 
                                     setVacationDays, 
                                     setEndDate, 
                                     endOfYear, 
                                     setMaxDayInCustomInput, 
                                     MAX_VACATION_DAYS) => {
 
    
    useEffect(() => {
        const daysUntilEndOfYear = endOfYear.diff(startDate, 'day') + 1;
        setMaxDayInCustomInput(MAX_VACATION_DAYS);
        if(daysUntilEndOfYear < MAX_VACATION_DAYS) {
            setVacationDays(daysUntilEndOfYear);
            setMaxDayInCustomInput(daysUntilEndOfYear);
        }
        calculatedEndDate(startDate, vacationDays, setEndDate, endOfYear);
    }, [startDate]);

    useEffect(() => {
        calculatedEndDate(startDate, vacationDays, setEndDate, endOfYear);
    }, [vacationDays,setVacationDays]);

    
}
