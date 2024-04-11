import React, { useState } from 'react';
import './EventAdmin.css';

export default function EventAdmin({ event, onDelete, onEdit }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleEditClick = () => {
    setShowEditModal(true);
    setEditedEvent(event);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    try {
      await onEdit(editedEvent);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  
  const handleCancelEdit = () => {
    setEditedEvent(event);
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event._id);
    }
  };

  const evenDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });



  return (
    <div className="event">
      <div className='event-header'>
        <span className='date'>{evenDate}</span>
        <span className='time'>{event.startTime} To {event.endTime}</span>
      </div>
      <h2 className='eventTitle'>{event.title}</h2>
      <p className='event-description'>{event.description}</p>
      <div className='event-actions'>
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>

      {showEditModal && (
        <div className="edit-modal">
          <h2>Edit Event</h2>
          <form onSubmit={handleSaveEdit}>
            <input type="text" name="title" value={editedEvent.title} onChange={handleChange} placeholder="Event Title" required />
            <input type="date" name="date" value={editedEvent.date} onChange={handleChange}  required />
            <textarea name="description" value={editedEvent.description} onChange={handleChange} placeholder="Event Description" required></textarea>
            <input type="text" name="startTime" value={editedEvent.startTime} onChange={handleChange} placeholder="Start Time" required />
            <input type="text" name="endTime" value={editedEvent.endTime} onChange={handleChange} placeholder="End Time" required />
            <div>
            <button className='cancel-btn' type="button" onClick={handleCancelEdit}>Cancel</button>
            <button className='save-btn' type="submit">Save</button>
            </div>
            
          </form>
        </div>
      )}
    </div>
    
  );
}
