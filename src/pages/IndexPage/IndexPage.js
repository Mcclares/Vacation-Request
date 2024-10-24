import VacationList from "../../components/VacationList/VacationList";
import "./IndexPage.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import {useNavigation} from "../../hooks/useNavigation";
import {Typography} from "@mui/material";


export default function IndexPage() {
    const goToPage = useNavigation();
    return (
        <div className="index-page">
            <Typography variant="h4" gutterBottom sx={{ margin: '20px 0'}}> Vacation requests</Typography>
            <VacationList/>
            <CustomButton name="Submit request" variant="contained" clickEvent={()=> goToPage("requestForm") } />
        </div>
    )
}
