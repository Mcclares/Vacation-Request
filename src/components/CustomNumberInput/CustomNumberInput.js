import React, {useEffect, useState} from "react";
import {Unstable_NumberInput as BaseNumberInput} from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {LabelStyle, StyledButton, StyledInput, StyledInputRoot} from "./CustomNumberInputStyle";
import {FormHelperText, Typography} from "@mui/material";

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
   
            <BaseNumberInput
                slots={{
                    root: StyledInputRoot,
                    input: StyledInput,
                    incrementButton: StyledButton,
                    decrementButton: StyledButton,
                }}
                slotProps={{
                    incrementButton: {
                        children: <AddIcon fontSize="small" />,
                        className: 'increment',
                        type: 'button'
                    },
                    decrementButton: {
                        children: <RemoveIcon fontSize="small" />,
                        type: 'button',
                    },
                }}
                {...props}
                ref={ref}
            />
   
    );
});

export default function CustomNumberInput( { label, newValue= 1, onChange, maxValue, setIsInvalidDate, showAlert }) {
    const inputId = "custom-number-input";
    const [value, setValue] = useState(newValue);
    
    useEffect(() => {
        if(newValue <= maxValue && newValue > 0) {
            if (typeof setIsInvalidDate === 'function') {
                setIsInvalidDate(false);
            }
            setValue(newValue || 1);
        }else {
            console.log("b")
            showAlert("Error: Invalid vacation days", 'error');
            if (typeof setIsInvalidDate === 'function') {
                setIsInvalidDate(true);
            }
        }
     
    },[newValue])
    
    const handleChange = (event, val) => {
        if (val && !isNaN(val) && val > 0) { 
            setValue(val);
            if (onChange) {
                onChange(val);
            }
        }
        
    }
    const handleKeyDown = (event) => {
        if (event.key === '-' || event.key === 'e') { 
            event.preventDefault();
            setValue(1);
            showAlert("Error: Only positive numbers are allowed", 'error');
        }else {
            if (event.key === 'Enter') {
                event.preventDefault();
                const currentValue = event.target.value.trim() === "" ? 1 : parseInt(event.target.value, 10);
                handleChange(event, currentValue);
                
            }
        }
        
    };
    const handlePaste = (event) => {
        const pastedData = event.clipboardData.getData('Text');
        if (!/^[0-9]+$/.test(pastedData)) { 
            event.preventDefault();
            showAlert("Error: Only positive numbers are allowed", 'error');
        }
    };
    return(
        <>
            <Typography style={LabelStyle}  variant="caption" component="label" htmlFor={inputId}>
                {label}
            </Typography>
            <NumberInput
                id={inputId} 
                aria-label="Number input field" 
                min={1} 
                max={maxValue} 
                onChange={handleChange}
                value={value || 1}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}

            />
            <FormHelperText>
                You can take 28 days of paid vacation(first day is included).
            </FormHelperText>
        </>
    )
}
