import VacationList from "../../components/VacationList/VacationList";
import "./IndexPage.css";
import CustomButton from "../../components/Button/СustomButton";
import {HandleNavigation} from "../../utils/HandleNavigation";


export default function IndexPage() {
    const goToPage = HandleNavigation();
    return (
        <div className="vacations-list">
            <VacationList/>
            <CustomButton name="Submit request" variant="contained" clickEvent={()=> goToPage("requestForm") } />
        </div>
    )
}
