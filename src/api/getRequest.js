export default async function getRequests() {
    try {
        const response = await fetch('https://localhost:8001/vacation_requests')
    } catch (error) {
        console.log(error);
    }
    
    return JSON.parse(localStorage.getItem('vacationRequests')) || [];
    
}
