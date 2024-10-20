import {Button as MuiButton} from "@mui/material";
export default function CustomButton({name,clickEvent,variant,customStyle}) {
    return(
        <MuiButton 
            style={customStyle?.props || {}}  
            variant={variant} 
            onClick={clickEvent}>
            {name}
        </MuiButton>
    )
}