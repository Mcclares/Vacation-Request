import {Button as MuiButton} from "@mui/material";
import {customButtonCommonStyle} from "./CustomButtonStyles";
export default function CustomButton({name,clickEvent,variant,customStyle, isError}) {
    return(
        <MuiButton 
            style={customStyle?.props || customButtonCommonStyle}  
            variant={variant} 
            onClick={clickEvent}
            disabled={isError}>
            {name}
        </MuiButton>
    )
}