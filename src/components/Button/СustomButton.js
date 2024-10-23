import {Button as MuiButton} from "@mui/material";
import {customButtonCommonStyle} from "./CustomButtonStyles";
export default function CustomButton({name,clickEvent,variant,customStyle, isError, startIcon, endIcon}) {
    return(
        <MuiButton 
            style={customStyle?.props || customButtonCommonStyle}  
            variant={variant} 
            onClick={clickEvent}
            disabled={isError}
            color="#8E8D8A"
            startIcon={startIcon}
            endIcon={endIcon}>
            {name}
        </MuiButton>
    )
}