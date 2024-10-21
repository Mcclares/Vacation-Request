import * as React from 'react';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {StyledButton,StyledInput,StyledInputRoot, LabelStyle} from "./CustomNumberInputStyle";
import {Box, Typography} from "@mui/material";


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
                    },
                    decrementButton: {
                        children: <RemoveIcon fontSize="small" />,
                    },
                }}
                {...props}
                ref={ref}
            />
   
    );
});

export default function CustomNumberInput( { label, value, onChange}) {
    const inputId = "custom-number-input";
    return(
        <>
            <Typography style={LabelStyle}  variant="caption" component="label" htmlFor={inputId}>
                {label}
            </Typography>
            <NumberInput 
                id={inputId} 
                aria-label="Number input field" 
                min={1} 
                max={99} 
                onChange={onChange}
                value={value}
            />
        </>
        
    )
}
