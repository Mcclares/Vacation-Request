export const handleVacationDaysChange = (
    days,
    startDate,
    setEndDate,
    setVacationDays,
    maxEndDay,
    setMaxEndDay
) => {
    if (!isNaN(days)) {
        setEndDate(startDate.add(days, 'day'));
        setVacationDays(days);
        setMaxEndDay(maxEndDay);
    }
};