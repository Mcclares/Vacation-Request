import {useEffect, useState} from "react";
import dayjs from "dayjs";

const useVacationDays = (startDate, endDate) => {
    const [vacationDays, setVacationDays] = useState(0)

    useEffect(() => {
        if(startDate && endDate && dayjs.isDayjs(startDate) && dayjs.isDayjs(endDate)) {
            const daysDiff = endDate.diff(startDate, 'day');
        
            if(daysDiff >= 0) {
                setVacationDays(daysDiff);
            }else {
                setVacationDays(0);
            }
        }
        else {
            setVacationDays(0);
        }
    }, [startDate,endDate]);
    return vacationDays;
}

export default useVacationDays;