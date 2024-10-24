import dayjs from 'dayjs';

export const handleEndDateChange = (
    today,
    newDate,
    startDate,
    setStartDate,
    setEndDate,
    setIsErrorInDates,
    setVacationDays,
    timeoutRef,
    MAX_VACATION_DAYS,
) => {
    const newEndDate = newDate ? dayjs(newDate) : null;
    const newMaxEndDay = startDate.add(MAX_VACATION_DAYS, 'day');
    const tomorrow = today.add(1, 'day');

    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout( () => {
        if(newEndDate && newEndDate.isAfter(newMaxEndDay, 'day')) {
            setStartDate(today);
            setVacationDays(1);
            setEndDate(tomorrow);
            setIsErrorInDates(true);
        }else if( newEndDate && newEndDate.isBefore(startDate.add(1,'day'),'day')) {
            setStartDate(today);
            setVacationDays(1);
            setEndDate(tomorrow);
            setIsErrorInDates(true);
            setEndDate(newEndDate)
            setIsErrorInDates(false);
        } else {
            setEndDate(newEndDate);
        }
    }, 500)
    
};