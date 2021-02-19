import React, { useState } from 'react'

import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form(props) {
  const [name, setName] = useState(props.name || "");

  const [interviewer, setInterviewerVal] = useState(props.interviewer || null);

  function reset() {
    setName("")
    setInterviewerVal(null)
  }

  function cancel() {
    reset()
    props.onCancel()
  }



  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
       
      />
    </form>
    <InterviewerList 
      // interviewers={props.interviewers} 
      interviewers={props.interviewers}
      interviewer={interviewer} 
      setInterviewer={setInterviewerVal}
      onChange={props.onChange}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button 
        danger
        onClick={cancel}>
          Cancel
      </Button>
      <Button 
        confirm
        onClick={props.onSave}>
          Save
      </Button>
    </section>
  </section>
</main>
  )
}