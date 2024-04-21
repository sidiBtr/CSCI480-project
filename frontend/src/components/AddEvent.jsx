import React, { useState } from 'react';
import './addEvent.css';

/**
 * Component for adding a new event.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onOutsideClick - Function to handle click outside the modal.
 * @returns {JSX.Element} - Returns the AddEvent component.
 */
const AddEvent = ({ onClose, onOutsideClick }) => {
  const [eventInfos, setEventInfos] = useState({}); // State for event information
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const api = import.meta.env.VITE_API_KEY; // API key for fetching data

  /**
   * Function to handle input changes.
   * 
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    setEventInfos({ ...eventInfos, [e.target.id]: e.target.value });
  };

  /**
   * Function to handle form submission.
   * 
   * @param {Object} e - Event object.
   */
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
      console.log('Event added successfully');
      onClose();
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
          <textarea onChange={handleChange} id='description' placeholder='Description' required></textarea>
          <input onChange={handleChange} type='text' id='startTime' placeholder='Start Time' required />
          <input onChange={handleChange} type='text' id='endTime' placeholder='End Time' required />
          <button className='create-btn' type='submit'>{loading ? '...' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
