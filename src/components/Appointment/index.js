import React, {useState} from 'react'

import { getInterviewersForDay } from "helpers/selectors"

import { useVisualMode } from "hooks/useVisualMode"

import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'

import './styles.scss'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // transition to saving
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(()=>{
        transition(SHOW)
      })
  }

  
 
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && 
      <Empty 
        onAdd={() => transition(CREATE)}
      />}

      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
      
    )}

      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />
      
    )}

      {mode === SAVING && (
      <Status
        message="SAVING"
      />
      
    )}  
    </article>
    
  )
}

