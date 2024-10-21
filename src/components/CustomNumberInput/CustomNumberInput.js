import * as React from 'react';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {StyledButton,StyledInput,StyledInputRoot} from "./CustomNumberInputStyle";

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

export default function CustomNumberInput() {
    return <NumberInput aria-label="Quantity Input" min={1} max={99} />;
}
