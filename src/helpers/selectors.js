export function getAppointmentsForDay(state, day) {

  // Inside state, find the ID of day (e.g 1: 'Monday')
  // Using the ID find the array of appointments
  // Using the ID's in the array, fetch appointmentObjects for each index

  const days = state.days
  const appointments = state.appointments

  for(const dayObj of days) {
     if(dayObj.name === day) {
       const appointmentArr = dayObj.appointments
       return appointmentArr.map(app => {
          return appointments[app]
        }
       )        
     }
  }

  
  



  

  
  //... returns an array of appointments for that day
  return []
}