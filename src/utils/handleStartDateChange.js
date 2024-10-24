import dayjs from 'dayjs';

export const handleStartDateChange = (
    newDate,
    today,
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
        } else {
            setStartDate(today);
            setVacationDays(1);
            setEndDate(tomorrow);
        }
        
    }, 500)
}