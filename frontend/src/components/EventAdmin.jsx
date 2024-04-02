import React, { useState } from 'react';
import './EventAdmin.css';

export default function EventAdmin({ event, onDelete, onEdit }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleEditClick = () => {
    setShowEditModal(true);
    setEditedEvent(event);
    console.log('edit button clicked', event)
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    try {
      console.log('Save Edit button clicked')
      console.log('edited event in EventAdmin.jsx:', editedEvent);
      await onEdit(editedEvent);
      console.log('save button clicked', editedEvent)
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

  // Format date yyyy-MM-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Format time HH:MM
  const formatTime = (time) => {
    return time.slice(0, 5);
  };

  return (
    <div className='event'>
      <div className='event-header'>
        <span className='date'>{formatDate(event.date)}</span>
        <span className='time'>{formatTime(event.startTime)} to {formatTime(event.endTime)}</span>
      </div>
      <h2 className='eventTitle'>{event.title}</h2>
      <p className='event-description'>{event.description}</p>
      <div className='event-actions'>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {showEditModal && (
        <div className="edit-modal">
          <h2>Edit Event</h2>
          <form onSubmit={handleSaveEdit}>
            <input type="text" name="title" value={editedEvent.title} onChange={handleChange} placeholder="Event Title" required />
            <input type="date" name="date" value={formatDate(editedEvent.date)} onChange={handleChange} placeholder="Event Date" required />
            <textarea name="description" value={editedEvent.description} onChange={handleChange} placeholder="Event Description" required></textarea>
            <input type="text" name="startTime" value={formatTime(editedEvent.startTime)} onChange={handleChange} placeholder="Start Time" required />
            <input type="text" name="endTime" value={formatTime(editedEvent.endTime)} onChange={handleChange} placeholder="End Time" required />
            <button className='cancel-btn' type="button" onClick={handleCancelEdit}>Cancel</button>
            <button className='cancel-btn' type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
