import dayjs from "dayjs";

export const handleEndDateChange = (
    newDate,
    vacationDays,
    startDate,
    setVacationDays,
    setEndDate,
    setIsInvalidDate,
    showAlert,
    setStartDate
) => {
    const endOfYear = dayjs().endOf('year');
    const newEndDate = newDate ? dayjs(newDate) : null;
    const today = dayjs();
    
    if(newEndDate && newEndDate.isAfter(endOfYear, 'day')) {
        setIsInvalidDate(true);
        showAlert("Error: Invalid date selection", "error")

    }else if( newEndDate && newEndDate.isBefore(startDate,'day')) {
        setIsInvalidDate(true);
        showAlert("Error: Invalid date selection", "error")

    } else {
        const daysUntilToday = newEndDate.diff(today, 'day')
        if(daysUntilToday < vacationDays) {
            setVacationDays(daysUntilToday + 1);
            setStartDate(newEndDate.subtract(daysUntilToday, 'day'))
        }else {
            setStartDate(newEndDate.subtract(vacationDays - 1, 'day'))
            setEndDate(newEndDate);
            setIsInvalidDate(false);
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
) => {
    const newStartDate = newDate ? dayjs(newDate) : null;

    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
        const tomorrow = today.add(1,'day');
        if (newStartDate 
            && newStartDate.isAfter(today.subtract(1,'day'), 'day') 
            && newStartDate.isBefore(endOfYear.add(1,'day'), 'day')) 
        {
            setStartDate(newStartDate);
            setEndDate(newStartDate.add(vacationDays , 'day'));
        } else {
            setStartDate(today);
            setVacationDays(1);
            setEndDate(tomorrow);
        }

    }, 500)
}

export const handleVacationDaysChange = (
    days,
    startDate,
    setEndDate,
    setVacationDays,
    maxValueCustomInput,
    setIsInvalidDate,
    showAlert
    
) => {
    
    if (!isNaN(days)) {
        if(days > maxValueCustomInput || days < 1) {
            showAlert("Error: Invalid date selection", "error");
            setIsInvalidDate(true);
        } else {
            setEndDate(startDate.add(days, 'day'));
            setVacationDays(days);
            setIsInvalidDate(false);
        }
    
    }
};