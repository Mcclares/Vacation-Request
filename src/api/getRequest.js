export default async function getRequests() {
    try {
        await fetch('https://localhost:8001/vacation_requests').then()
    } catch {
    }
    
    return JSON.parse(localStorage.getItem('vacationRequests')) || [];
    
}
