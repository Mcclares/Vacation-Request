﻿import VacationList from "../../components/VacationList/VacationList";
import "./IndexPage.css";
import CustomButton from "../../components/Button/СustomButton";
import {handleNavigation} from "../../utils/handleNavigation";
import {Typography} from "@mui/material";


export default function IndexPage() {
    const goToPage = handleNavigation();
    return (
        <div className="index-page">
            <Typography variant="h4" gutterBottom sx={{ margin: '20px 0'}}> Vacation requests</Typography>
            <VacationList/>
            <CustomButton name="Submit request" variant="contained" clickEvent={()=> goToPage("requestForm") } />
        </div>
    )
}
