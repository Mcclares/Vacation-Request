import dayjs from 'dayjs';

export const handleEndDateChange = (
    newDate,
    startDate,
    maxEndDay,
    setEndDate,
    setIsErrorInDates,
) => {
    const newEndDate = newDate ? dayjs(newDate) : null;
    if (newEndDate && newEndDate.isAfter(startDate, 'day') && newEndDate.isBefore(maxEndDay, 'day')) {
        setEndDate(newEndDate);
        setIsErrorInDates(false);
    }else {
        setIsErrorInDates(true);
    }
};