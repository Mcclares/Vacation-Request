import {useEffect} from "react";

export const UseTimeOutClearEffect = (timeOutRef) => {
    useEffect(() => {
        return () => {
            if(timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
        }
    }, [timeOutRef]);
}