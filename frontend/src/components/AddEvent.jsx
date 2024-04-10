import React, { useState } from 'react';
import './addEvent.css'
const AddEvent = ({ onClose, onOutsideClick }) => {
  const [eventInfos, setEventInfos] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_API_KEY

  const handleChange = (e) => {
    setEventInfos({ ...eventInfos, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${api}/api/events/create_event`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(eventInfos)
      });

      if (!response.ok) {
        setLoading(false);
        console.log('Error sending the data', response.status);
        return;
      }

      setLoading(false);
      console.log('event added successfully')
      onClose()
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="modal" onClick={onOutsideClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type='text' id='title' placeholder='Event title' required />
          <input onChange={handleChange} type='date' id='date' placeholder='Date' required />
          <textarea onChange={handleChange} type='text' id='description' placeholder='Description' required>
            
          </textarea>
          <input onChange={handleChange} type='text' id='startTime' placeholder='Start Time' required />
          <input onChange={handleChange} type='text' id='endTime' placeholder='End Time' required />
          <button type='submit'>{loading? '....': 'Create'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
