import React, {useState} from 'react'

import { getInterviewersForDay } from "helpers/selectors"

import { useVisualMode } from "hooks/useVisualMode"

import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'
import Form from 'components/Appointment/Form'
import Confirm from 'components/Appointment/Confirm'
import Status from 'components/Appointment/Status'
import Error from 'components/Appointment/Error'

import './styles.scss'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

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
      .then(() => transition(SHOW))
      .catch((error) => transition (ERROR_SAVE, true))
  }

  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // transition to show
    transition(EDIT, false)
  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // transition to saving
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }

  function confirm() {
    transition(CONFIRM)
  }
 
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && 
      <Empty 
        onAdd={() => transition(CREATE)}
      />}

      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={confirm}
        onEdit={edit}
      />
      
    )}

      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />
      
    )}

      {mode === EDIT && (
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
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

    {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onConfirm={cancel}
            onDeny={back}
          />
          
        )} 

    {mode === DELETING && (
      <Status
        message="DELETING"
      />
      
    )} 

    {mode === ERROR_SAVE && (
      <Error
        message="ERROR WHILE SAVING"
        onClose={back}
      />
      
    )} 

    {mode === ERROR_DELETE && (
      <Error
        message="ERROR WHILE DELETING"
        onClose={back}
      />
      
    )} 
    </article>
    
  )
}

