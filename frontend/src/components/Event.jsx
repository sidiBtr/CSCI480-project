import React from 'react';
import './event.css';

/**
 * Component for displaying an event.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.event - Event object containing event details.
 * @returns {JSX.Element} - Returns the Event component.
 */
export default function Event({ event }) {
  // Format date to a human-readable format
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
  );
}
