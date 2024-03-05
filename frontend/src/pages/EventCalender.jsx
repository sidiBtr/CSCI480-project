import React, { useEffect, useState } from 'react'
import './eventscalenderPage.css'
import Event from '../components/Event'

export default function EventCalender() {
  const[event, setEvent] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchEvents = async ()=> {
      try{
        setLoading(true)
        const response = await fetch("http://localhost:5555/api/events/allEvents")
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
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className='events-container'>
      <h2 className='event-page-title'>Events Calendar</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        event.map((ev) => (
          <Event key={ev._id} event={{ ...ev, date: formatDate(ev.date) }}/>
        ))
      )}
    </div>
  );
}