import dayjs from 'dayjs';
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