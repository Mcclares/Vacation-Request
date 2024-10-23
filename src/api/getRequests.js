
export default function getRequests() {
    const requests = JSON.parse(localStorage.getItem('vacationRequests')) || [];
    return requests;
}