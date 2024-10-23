import dayjs from 'dayjs';

export const handleEndDateChange = (
    newDate,
    startDate,
    endOfYearEndDate,
    setEndDate,
    setIsErrorInDates
) => {
    const newEndDate = newDate ? dayjs(newDate) : null;
    if (newEndDate && newEndDate.isAfter(startDate, 'day') && newEndDate.isBefore(endOfYearEndDate, 'day')) {
        setEndDate(newEndDate);
        setIsErrorInDates(false);
    } else {
        setIsErrorInDates(true);
    }
};