import React from 'react'
import './event.css'

export default function Event({event}) {
  //const encodedImage = encodeURIComponent(event.image.replace(/ /g, '%20'));
  const encodedImage = encodeURIComponent(event.image).replace(/%20/g, ' ');
  return (
      <div className='event'>
        <span className='date'>{event.date}</span>
        <span className='time'>{event.startTime} to {event.endTime}</span>
        <h2 className='eventTitle'>{event.title}</h2>
        <p className='event-description'>{event.description}</p>
        <img className='eventImage' src={event.image} alt={event.title} />
        {console.log('event image',event.image)}
      </div>
  )
}
