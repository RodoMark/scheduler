import React, {useState, useEffect} from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index.js"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js"



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
    },
    interviewers: {

    }
  });

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

    axios.put(`/api/appointments/${id}`, {interview})
    
    setState({
      ...state,
      appointments
    });

  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...appointment.appointments[id],
      interview: {...interview}
    }

    const appointments = {
      ...appointments,
      [id]: appointment
    }

    axios.delete(`/api/appointments/${id}`, {...interview})

    setState({
      ...state,
      appointments
    })

  }

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers =
  getInterviewersForDay(state, state.day)

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
    />
  );
});

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
        {schedule}
        <Appointment 
          key="last" 
          time="5pm"/>
      </section>
    </main>
  );
}

