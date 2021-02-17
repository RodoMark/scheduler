import React, {useState, useEffect} from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index.js"
import { getAppointmentsForDay } from "../helpers/selectors.js"


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
    }
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day) 

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

  useEffect(() => {
    Promise.all([
      getDays, 
      getAppointments])
      .then(output => {
        const days = output[0]
        const apps = output[1]
        
        setState({
          ...state, days: days, appointments: apps
        })

      })
      .catch((error) => {
        console.log("ERROR:", error)
      })
    
  }, [])

  const parsedAppointments = dailyAppointments.map(app => {
    return(
    <Appointment
      key={app.id}
      {...app} 
    />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
       
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment 
          key="last" 
          time="5pm"/>
      </section>
    </main>
  );
}

