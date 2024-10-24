export default function getRequests() {

    const requests = JSON.parse(localStorage.getItem('vacationRequests')) || [];
    console.log(requests);
    return requests;
}
