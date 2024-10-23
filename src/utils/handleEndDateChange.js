import dayjs from 'dayjs';

export const handleEndDateChange = (
    newDate,
    startDate,
    maxEndDay,
    setEndDate,
    setIsErrorInDates,
) => {
    const newEndDate = newDate ? dayjs(newDate) : null;
    if (newEndDate && newEndDate.isAfter(startDate, 'day') && newEndDate.isBefore(maxEndDay.add(1,'day'), 'day')) {
        setEndDate(newEndDate);
        setIsErrorInDates(false);
    }else {
        setIsErrorInDates(true);
    }
};