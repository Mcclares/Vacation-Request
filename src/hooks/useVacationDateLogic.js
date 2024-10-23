import {useEffect} from "react";


export const useVacationDateLogic = (startDate, endDate, vacationDays, setVacationDays, setEndDate, setIsErrorInDates) => {
    useEffect(() => {
        if(endDate && endDate.isAfter(startDate,'day')) {
            const daysDiff = endDate.diff(startDate, 'day');
            setVacationDays(daysDiff);
            setIsErrorInDates(false);
        }

    }, [endDate, startDate, setVacationDays, setIsErrorInDates])

    useEffect(() => {
        if(startDate && vacationDays) {
            const calculatedEndDate = startDate.add(vacationDays, 'day');
            setEndDate(calculatedEndDate)
            setIsErrorInDates(false);
        }
    },[startDate,vacationDays,setEndDate,setIsErrorInDates])
}
