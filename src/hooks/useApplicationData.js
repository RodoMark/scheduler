import {useState, useReducer, useEffect} from 'react'
import axios from 'axios'

import { getSpotsByName, getAppointmentsForDay } from '../helpers/selectors'

const ACTIONS = {
  SET_DAY: "SET_DAY",
  SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
  SET_INTERVIEW: "SET_INTERVIEW",
}

export function useApplicationData(){

  const state = {
    day: "Monday",
    days: [],
    appointments: {
    },
    interviewers: {
    
    },
  }

  function reducer(state, action) {
    if(action === ACTIONS.SET_DAY) {
      return { ...state, day: day }
    }

    if(action === ACTIONS.SET_APPLICATION_DATA) {
      return {...state,}
    }

    if(action === ACTIONS.SET_INTERVIEW) {
      return { ...state, appointments}
    }
  
  }

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {
  //   },
  //   interviewers: {
    
  //   },
   
  // });

  const setDay = day => {setState({...state, day: day})}

  
 
  
  


  const getDays = 
  axios.get('/api/days')
    .then((output) => {
      return output.data
    }).catch((error) => {
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
        
        useReducer({
          ...state, 
          days: days, 
          appointments: apps, 
          interviewers: interviewers,
        }, ACTIONS.SET_APPLICATION_DATA)

      })
      .catch((error) => {
        console.log("ERROR:", error)
      })
    
  }, [])



    function bookInterview(id, interview) {
    // console.log(id, interview)
    // console.log("HERE IS BOOK")

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
 
    setState({
      ...state,
      appointments
    });
    
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((output)=> {
        axios.get('/api/days')
        .then((days) => {
          setState((prevState) => {
            return {...prevState, days: days.data}
          })
        })
        return output
      })
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
    
    return axios.delete(`/api/appointments/${id}`)
    .then((output)=> {
      axios.get('/api/days')
      .then((days) => {
        setState((prevState) => {
          return {...prevState, days: days.data}
        })
      })
      return output
    })
    
  }

  

 
  return {
    state,
    setDay, 
    bookInterview,
    cancelInterview,
  }
}