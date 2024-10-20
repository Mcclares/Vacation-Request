import {Button as MuiButton} from "@mui/material";
export default function CustomButton({name,clickEvent,variantStyle,customStyle}) {
    return(
        <MuiButton style={customStyle || ""}  variant={variantStyle} onClick={clickEvent}>{name}</MuiButton>
    )
}