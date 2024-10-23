import VacationList from "../../components/VacationList/VacationList";
import "./IndexPage.css";
import CustomButton from "../../components/Button/СustomButton";
import {handleNavigation} from "../../utils/handleNavigation";


export default function IndexPage() {
    const goToPage = handleNavigation();
    return (
        <div className="vacations-list">
            <VacationList/>
            <CustomButton name="Submit request" variant="contained" clickEvent={()=> goToPage("requestForm") } />
        </div>
    )
}
