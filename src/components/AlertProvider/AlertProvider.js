import {useState} from "react";
import {Snackbar} from "@mui/material";

const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const showAlert = (newMessage, newSeverity = 'info') => {
        setMessage(newMessage);
        setSeverity(newSeverity);
        setOpen(true);
    };

    const hideAlert = () => {
        setOpen(false);
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={hideAlert}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                severity={severity}
            />
        </AlertContext.Provider>
    );
};