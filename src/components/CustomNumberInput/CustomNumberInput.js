import {useState , useEffect} from "react";
import React from "react";
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {StyledButton,StyledInput,StyledInputRoot, LabelStyle} from "./CustomNumberInputStyle";
import {Typography} from "@mui/material";
import {FormHelperText} from "@mui/material";

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
                        type: 'button'
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
        setValue(newValue || 1);
    },[newValue])
    
    const handleChange = (event, val) => {
        if(val <= maxValue) {
            setIsInvalidDate(false);
            setValue(val);
            if (onChange) {
                onChange(val);
            }
           
        }else {
            showAlert("Error: Invalid vacation days", 'error');
            setIsInvalidDate(true);
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
           
            event.preventDefault();
            const currentValue = parseInt(event.target.value);
            handleChange(event,currentValue)

           
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
                
            />
            <FormHelperText>
                You can take 28 days of paid vacation(first day is included).
            </FormHelperText>
        </>
    )
}
