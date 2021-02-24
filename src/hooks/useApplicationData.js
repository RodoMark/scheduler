import {useState, useEffect} from 'react'
import axios from 'axios'

import { updateSpots } from '../helpers/selectors'

export function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
    },
    interviewers: {
    
    },
   
  });

  const setDay = day => {setState({...state, day: day})}




  const getDays = 
  axios.get('/api/days')
    .then((output) => {
      return output.data
    })
    .catch((error) => {
      console.log("ERROR:", error)
    })

  const getAppointments = 
  axios.get('/api/appointments')
    .then((output) => {
      return output.data
    })
    .catch((error) => {
      console.log("ERROR:", error)
    })


  const getInterviewers = 
  axios.get('/api/interviewers')
    .then((output) => {
      return output.data
    })
    .catch((error) => {
      console.log("ERROR:", error)
    })

  useEffect(() => {
    Promise.all([
      getDays, 
      getAppointments,
      getInterviewers])
      .then(output => {
        const days = output[0]
        const apps = output[1]
        const interviewers = output[2]

        setState({
          ...state, 
          days: days, 
          appointments: apps, 
          interviewers: interviewers,
        })
        
      })
      .catch((error) => {
        console.log("ERROR:", error)
      })
    
  }, [])



    function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState(prevState => {
      const pendingState = {...prevState, appointments}
      updateSpots(pendingState)
      return pendingState
    })

    
    
    return axios.put(`/api/appointments/${id}`, {interview})      
  }

  function cancelInterview(id) 
  {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    setState(prevState => {
      const pendingState = {...prevState, appointments}
      updateSpots(pendingState)
      return pendingState
    })
    
    return axios.delete(`/api/appointments/${id}`)
   
    
  }

  

 
  return {
    state,
    setDay, 
    bookInterview,
    cancelInterview,
  }
}