import dayjs from "dayjs";

export const handleEndDateChange = (
    newDate,
    vacationDays,
    startDate,
    setVacationDays,
    setEndDate,
    setIsInvalidDate,
    showAlert,
    setStartDate,
    maxValueInCustomInput
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
        setIsInvalidDate(false);
        const daysUntilToday = newEndDate.diff(today, 'day');
        const maxDay = startDate.add(maxValueInCustomInput, 'day');
        if(daysUntilToday < vacationDays) {
            setVacationDays(daysUntilToday + 1);
            setStartDate(newEndDate.subtract(daysUntilToday, 'day'))
        }else {
            if(newEndDate.isAfter(maxDay.subtract(1, 'day'))) {
                setStartDate(newEndDate.subtract(27, 'day'));
                setVacationDays(28);
        
            }else {
                const newVacationDays = newEndDate.diff(startDate.subtract(1, 'day'), 'day') ;
                setVacationDays(newVacationDays);
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
