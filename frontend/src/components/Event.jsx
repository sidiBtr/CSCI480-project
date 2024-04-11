import React from 'react'
import './event.css'

export default function Event({event}) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
  return (
      <div className='event'>
        <span className='date'>{formattedDate}</span>
        <span className='time'>{event.startTime} to {event.endTime}</span>
        <h2 className='eventTitle'>{event.title}</h2>
        <p className='event-description'>{event.description}</p>
      </div>
  )
}
