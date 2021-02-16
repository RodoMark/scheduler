import React from 'react'

import Button from '../Button.js'

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button danger onClick={(event) => props.onCancel(props.message)} >Cancel</Button>
    <Button danger onClick={(event) => props.onConfirm('Confirmed')}>Confirm</Button>
  </section>
</main>
  )
}