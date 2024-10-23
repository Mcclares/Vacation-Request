export const handleVacationDaysChange = (
    days,
    startDate,
    setEndDate,
    setVacationDays,
) => {
    if (!isNaN(days)) {
        setEndDate(startDate.add(days, 'day'));
        setVacationDays(days);
    }
};