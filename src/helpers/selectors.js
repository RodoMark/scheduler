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

export function getInterview(state, interview) {
  if(!interview) return null

  const student = interview.student
  const intID = interview.interviewer

  const interviewer = state.interviewers[intID]

  if(interviewer){
    return {
      student,
      interviewer,
    }  
  }
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviews for that day
    const days = state.days
    const interviewers = state.interviewers
  
    for(const dayObj of days) {
       if(dayObj.name === day) {
         const interviewersArr = dayObj.interviewers
         return interviewersArr.map(int => {
            return interviewers[int]
          }
        )        
      }
    }
    
    return []
}

export function updateSpots(state) {
// updates the number of spots once an interview is sucessfully booked or canceled
  const currentDay = state.days.find(day => day.name === state.day)

  let newSpots = 0

  for(const appointmentId of currentDay.appointments){
    if(!state.appointments[appointmentId].interview){
      newSpots++
    }
  }

  currentDay.spots = newSpots
}
