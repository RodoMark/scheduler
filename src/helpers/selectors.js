export function getAppointmentsForDay(state, day) {

//... returns an array of appointments for that day

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
  
  return []
}