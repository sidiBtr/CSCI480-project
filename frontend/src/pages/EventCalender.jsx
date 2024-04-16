import React, { useEffect, useState } from 'react'
import './eventscalenderPage.css'
import Event from '../components/Event'
// this is an eventcalendar component.
export default function EventCalender() {
  const[events, setEvent] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const api = import.meta.env.VITE_API_KEY
  // fetch from the backend
  useEffect(() => {
    const fetchEvents = async ()=> {
      try{
        setLoading(true)
        const response = await fetch(`${api}/api/events/allEvents`)
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
  


  return (
    <div className='events-container'>
      <h2 className='event-page-title'>Upcoming Events</h2>
      <div className={events.length > 0 ? 'events-list' : 'events-list empty'}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : events.map((event) => (
          <Event key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}