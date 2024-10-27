import dayjs from "dayjs";


export const handleEndDateChange = (
    newDate,
    vacationDays,
    startDate,
    maxValueInCustomInput,
    setStartDate,
    setVacationDays,
    setEndDate,
    setIsInvalidDate,
    showAlert,
    MAX_VACATION_DAYS,
) => {

    const DAYS_BEFORE_MAX_VACATION = MAX_VACATION_DAYS - 1;
    
    const endOfYear = dayjs().endOf('year');
    const newEndDate = newDate ? dayjs(newDate) : null;
    const today = dayjs();
    
    if(newEndDate && (newEndDate.isAfter(endOfYear, 'day') || newEndDate.isBefore(startDate,'day'))) {
        setIsInvalidDate(true);
        showAlert("Error: Invalid date selection", "error")
    }
    else {
        setIsInvalidDate(false);
        const daysUntilToday = newEndDate.diff(today, 'day') ;
        const maxAllowedEndDate = startDate.add(maxValueInCustomInput, 'day');
        const endDateLimit = maxAllowedEndDate.subtract(1, 'day');
        
        if(daysUntilToday < vacationDays) {
            const daysCountWithToday = daysUntilToday + 1;
            setVacationDays(daysCountWithToday);
            setStartDate(newEndDate.subtract(daysUntilToday, 'day'))
            
        }else {
            if(newEndDate.isAfter(endDateLimit)) {
                setStartDate(newEndDate.subtract(DAYS_BEFORE_MAX_VACATION, 'day'));
                setVacationDays(MAX_VACATION_DAYS);
            }else {
                const adjustedStartDate = startDate.subtract(1, 'day');
                const totalVacationDaysIncludingStart = newEndDate.diff(adjustedStartDate, 'day') ;
                setVacationDays(totalVacationDaysIncludingStart);
                setEndDate(newEndDate);
              
            }
            
        }
        
    }

};


export const handleStartDateChange = (
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
) => {
    const newStartDate = newDate ? dayjs(newDate) : null;

    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
        if (newStartDate 
            && newStartDate.isAfter(today.subtract(1,'day'), 'day') 
            && newStartDate.isBefore(endOfYear.add(1,'day'), 'day')) 
        {
            setStartDate(newStartDate);
            setEndDate(newStartDate.add(vacationDays , 'day'));
        } else {
            setStartDate(today);
            setVacationDays(1);
            setEndDate(today);
            setIsInvalidDate(false);
            showAlert("Error: Invalid date selection", "error")
            
        }

    }, 500)
}
