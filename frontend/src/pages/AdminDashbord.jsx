import React, { useState, useEffect } from 'react';
import AddEvent from '../components/AddEvent';
import EventAdmin from '../components/EventAdmin';
import './eventDasbord.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5555/api/events/allEvents");
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      //console.log('fetched data', data)
      setEvents(data.events);
      //console.log(events)
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleAddEventClick = () => {
    setShowAddEventModal(true);
  };

  const handleCloseAddEventModal = () => {
    setShowAddEventModal(false);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5555/api/events/deleteEvent/${eventId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleEditEvent = async (eventId, editedEvent) => {
    try {
      console.log('edited event in AdminDashboard.jsx:', editedEvent);
      const response = await fetch(`http://localhost:5555/api/events/updateEvent/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedEvent)
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      const data = await response.json()
      console.log(data)
      // Update the event in the events array
      setEvents(events.map(event => event._id === eventId ? editedEvent : event));
      console.log(`Event with ID ${eventId} updated successfully.`);
      
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="event-dashboard">
      <button onClick={handleAddEventClick}>Add Event</button>
      {showAddEventModal && <AddEvent onClose={handleCloseAddEventModal} />}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        events.map(event => (
          <EventAdmin
            key={event._id}
            event={event}
            onDelete={() =>handleDeleteEvent(event._id)}
            onEdit={(editedEvent) => handleEditEvent(event._id, editedEvent)}
          />
        ))
      )}

    </div>
  );
};

export default AdminDashboard;
