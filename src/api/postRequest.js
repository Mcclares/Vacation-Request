export default async function postRequest(startDate, vacationDays, endDate, comment) {
    const requestId = Date.now();

    const formData = {
        id: requestId,
        startDate: startDate.format("DD/MM/YYYY"),
        vacationDays: vacationDays,
        endDate: endDate.format("DD/MM/YYYY"),
        comment: comment
    }
    try {
        const response = await fetch("https://localhost:8001/vacation_requests", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) 
        }); 
    }catch(error) {
        console.log(error)
        
    }
    
    const existingRequest = JSON.parse(localStorage.getItem('vacationRequests')) || [];
    existingRequest.push(formData);
    localStorage.setItem('vacationRequests', JSON.stringify(existingRequest));
}