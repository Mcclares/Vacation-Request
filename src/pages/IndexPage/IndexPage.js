import VacationList from "../../components/VacationList/VacationList";
import "./IndexPage.css";
import CustomButton from "../../components/Button/СustomButton";
export default function IndexPage() {
    return (
        <div className="vacations-list">
            <VacationList/>
            <CustomButton name="Submit request" variant="contained" />
        </div>
    )
}
