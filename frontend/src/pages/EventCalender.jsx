import React, { useEffect, useState } from 'react';
import './eventscalenderPage.css';
import Event from '../components/Event';

/**
 * Component for displaying an event calendar.
 * 
 * @returns {JSX.Element} - Returns the EventCalender component.
 */
export default function EventCalender() {
  const [events, setEvent] = useState([]); // State for events
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const api = import.meta.env.VITE_API_KEY;

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api}/api/events/allEvents`);
        if (!response.ok) {
          setError(true);
          throw new Error(`Error occurred ${response.status}`);
        }
        const data = await response.json();
        setEvent(data.events);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching events.");
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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
