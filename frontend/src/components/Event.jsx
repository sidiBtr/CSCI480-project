import React from 'react'
import './event.css'

export default function Event({event}) {
  return (
      <div className='event'>
        <span className='date'>{event.date}</span>
        <span className='time'>{event.startTime} to {event.endTime}</span>
        <h2 className='eventTitle'>{event.title}</h2>
        <p className='event-description'>{event.description}</p>
        <img className='eventImage' src= {event.image} alt={event.title}/>
      </div>
  )
}
