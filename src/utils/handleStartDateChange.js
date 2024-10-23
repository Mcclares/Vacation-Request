import dayjs from 'dayjs';

export const handleStartDateChange = (
    newDate,
    today,
    endOfYearStartDate,
    endOfYearEndDate,
    MAX_VACATION_DAYS,
    vacationDays,
    setVacationDays,
    timeoutRef,
    setStartDate,
    setEndDate,
    setMaxEndDay,
    setIsErrorInDates,
    tomorrow
) => {
    const newStartDate = newDate ? dayjs(newDate) : null;

    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
        if (newStartDate && newStartDate.isAfter(today, 'day') && newStartDate.isBefore(endOfYearStartDate, 'day')) {
            setStartDate(newStartDate);

            const potentialMaxEndDate = newStartDate.add(MAX_VACATION_DAYS, 'day');
            const maxEndDate = potentialMaxEndDate.isAfter(endOfYearEndDate) ? endOfYearEndDate : potentialMaxEndDate;
            setMaxEndDay(maxEndDate);
            setEndDate(newStartDate.add(vacationDays, 'day'));
            setIsErrorInDates(false);
        } else if (newStartDate) {
            setStartDate(today);
            setVacationDays(1);
            setEndDate(tomorrow);
            setMaxEndDay(endOfYearEndDate);
            setIsErrorInDates(false);
        }
    }, 500);
};