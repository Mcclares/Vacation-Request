import VacationList from "../../components/VacationList/VacationList";
import "./IndexPage.css";
import CustomButton from "../../components/Button/СustomButton";
import {handleNavigation} from "../../utils/handleNavigation";


export default function IndexPage() {
    const goToPage = handleNavigation();
    return (
        <div className="index-page">
            <div className="vacations-list">
            <VacationList/>
            </div>
            <CustomButton name="Submit request" variant="contained" clickEvent={()=> goToPage("requestForm") } />
        </div>
    )
}
