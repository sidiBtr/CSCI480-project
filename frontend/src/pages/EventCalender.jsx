import React, { useEffect, useState } from 'react'
import './eventscalenderPage.css'
import Event from '../components/Event'

export default function EventCalender() {
  const[events, setEvent] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchEvents = async ()=> {
      try{
        setLoading(true)
        const response = await fetch("http://localhost:3000/api/events/allEvents")
        if(!response){
          setError(true)
          throw new Error(`error occured ${response.status}`)
        }
        const data = await response.json()
        setEvent(data.events)
        setLoading(false)

      } catch(error){
        setError("An error occurred while fetching events.");
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])
  // format the date
  const formatDate = (date) => {
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} `;
  };

  return (
    <div className='events-container'>
      <h2 className='event-page-title'>Events Calendar</h2>
      <div className={events.length > 0 ? 'events-list' : 'events-list empty'}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : events.map((event) => (
          <Event key={event._id} event={{ ...event, date: formatDate(event.date) }} />
        ))}
      </div>
    </div>
  );
}