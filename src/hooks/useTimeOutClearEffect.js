import {useEffect} from "react";

export const useTimeOutClearEffect = (timeOutRef) => {
    useEffect(() => {
        return () => {
            if(timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
        }
    }, [timeOutRef]);
}