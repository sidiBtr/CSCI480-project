import React, { useState } from 'react';
import './addEvent.css'
import { json } from 'react-router-dom';
const AddEvent = ({ onClose, onOutsideClick }) => {
  const [eventInfos, setEventInfos] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEventInfos({ ...eventInfos, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEventInfos({ ...eventInfos, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', eventInfos.title);
      formData.append('date', eventInfos.date);
      formData.append('description', eventInfos.description);
      formData.append('image', eventInfos.image);
      formData.append('startTime', eventInfos.startTime);
      formData.append('endTime', eventInfos.endTime);

      const response = await fetch("http://localhost:3000/api/events/create_event", {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        setLoading(false);
        console.log('Error sending the data', response.status);
      }

      setLoading(false);
      console.log('event added successfully')
      onClose()
      // Handle success response
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
          <input onChange={handleFileChange} type='file' id='image' required/>
          <input onChange={handleChange} type='text' id='startTime' placeholder='Start Time' required />
          <input onChange={handleChange} type='text' id='endTime' placeholder='End Time' required />
          <button type='submit'>{loading? '....': 'Create'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
