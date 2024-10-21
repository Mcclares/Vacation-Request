﻿import {useEffect, useState} from "react";

const UseCalculateEndDate = (startDate, vacationDays) => {
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {
        if(startDate && vacationDays) {
            const calculatedEndDate = startDate.add(vacationDays, 'day');
            setEndDate(calculatedEndDate);
        }else {
            setEndDate(null)
        }
    }, [startDate,vacationDays])
    
    return [endDate];
};

export default UseCalculateEndDate;