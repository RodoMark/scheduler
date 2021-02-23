import React from 'react'
import './DayListItem.scss'
import classNames from 'classnames';

export default function DayListItem(props) {
  const formatSpots = function(spots) {
    if (spots === 0 ) {
      return 'no spots remaining'
    } else if(spots === 1) {
      return `${spots} spot remaining`
    } else {
      return `${spots} spots remaining`
    }
  }

  let dayClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
 })

// console.log(props)

  return (
    <li data-testid = "day" onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 
      className={dayClass}
      >{formatSpots(props.spots)}</h3>
    </li>
  )
}