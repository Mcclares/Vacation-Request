import dayjs from "dayjs";

export const handleEndDateChange = (
    newDate,
    startDate,
    setEndDate,
    setIsInvalidDate,
    showAlert,
    MAX_VACATION_DAYS,
) => {
    const newEndDate = newDate ? dayjs(newDate) : null;
    const newMaxEndDay = startDate.add(MAX_VACATION_DAYS, 'day');


    if(newEndDate && newEndDate.isAfter(newMaxEndDay, 'day')) {
        setIsInvalidDate(true);
        showAlert("Error: Invalid date selection", "error")

    }else if( newEndDate && newEndDate.isBefore(startDate.add(1,'day'),'day')) {
        setIsInvalidDate(true);
        showAlert("Error: Invalid date selection", "error")

    } else {
        setEndDate(newEndDate);
        setIsInvalidDate(false);
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
        if (newStartDate && newStartDate.isAfter(today.subtract(1,'day'), 'day') && newStartDate.isBefore(endOfYear, 'day')) {
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