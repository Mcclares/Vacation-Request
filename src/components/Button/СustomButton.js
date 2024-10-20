import {Button as MuiButton} from "@mui/material";
import {customButtonCommonStyle} from "./CustomButtonStyles";
export default function CustomButton({name,clickEvent,variant,customStyle}) {
    return(
        <MuiButton 
            style={customStyle?.props || customButtonCommonStyle}  
            variant={variant} 
            onClick={clickEvent}>
            {name}
        </MuiButton>
    )
}