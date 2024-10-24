export default function postRequest(startDate, vacationDays, endDate, comment) {
    const requestId = Date.now();

    const formData = {
        id: requestId,
        startDate: startDate.format("DD/MM/YYYY"),
        vacationDays: vacationDays,
        endDate: endDate.format("DD/MM/YYYY"),
        comment: comment
    }

    const existingRequest = JSON.parse(localStorage.getItem('vacationRequests')) || [];
    existingRequest.push(formData);
    localStorage.setItem('vacationRequests', JSON.stringify(existingRequest));
}