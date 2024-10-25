import {Button as MuiButton} from "@mui/material";
import {customButtonCommonStyle} from "./CustomButtonStyles";
export default function CustomButton({name,clickEvent,variant,customStyle, isInvalidDate, startIcon, endIcon,type}) {
    return(
        <MuiButton
            style={customStyle?.props || customButtonCommonStyle}
            variant={variant}
            onClick={clickEvent}
            disabled={isInvalidDate}
            color="#8E8D8A"
            startIcon={startIcon}
            endIcon={endIcon}
            type={type}>
            {name}
        </MuiButton>
    )
}