import {useEffect, useState} from "react";

const useVacationDays = (startDate, endDate) => {
    const [vacationDays, setVacationDays] = useState(0)

    useEffect(() => {
        if(startDate && endDate) {
            const daysDiff = endDate.diff(startDate, 'day');
            setVacationDays(daysDiff)
        }
    }, [startDate,endDate]);
    return vacationDays;
}

export default useVacationDays;