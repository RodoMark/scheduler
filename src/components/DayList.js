import React from 'react'

import DayListItem from './DayListItem'



export default function DayList(props) {
  return (
    <div className="DayListItem">
      {props.days.map(day => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={event => props.setDay(day.name)}
        />
        )
      )}
        
    </div>
  )   
}