import React from 'react'
import classNames from 'classnames'

import './InterviewerListItem.scss'

export default function InterviewerListItem(props) {
  let interviewerClass = classNames('interviewers__item', {
    "interviewers__item--selected": props.selected,
    "interviewers__item--full": props.spots === 0
 })

  return (
    <li className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected ? props.name : ''}
</li>
  )
}