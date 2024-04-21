import React, { useState } from 'react';
import './EventAdmin.css';

/**
 * Component for displaying and managing event details for administrators.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.event - Event object containing event details.
 * @param {Function} props.onDelete - Function to delete the event.
 * @param {Function} props.onEdit - Function to edit the event.
 * @returns {JSX.Element} - Returns the EventAdmin component.
 */
export default function EventAdmin({ event, onDelete, onEdit }) {
  const [showEditModal, setShowEditModal] = useState(false); // State for showing edit modal
  const [editedEvent, setEditedEvent] = useState(event); // State for edited event details

  /**
   * Function to handle edit button click.
   */
  const handleEditClick = () => {
    setShowEditModal(true);
    setEditedEvent(event);
  };

  /**
   * Function to handle saving edited event.
   * 
   * @param {Object} e - Event object.
   */
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await onEdit(editedEvent);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  
  /**
   * Function to handle canceling edit.
   */
  const handleCancelEdit = () => {
    setEditedEvent(event);
    setShowEditModal(false);
  };

  /**
   * Function to handle input changes.
   * 
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  /**
   * Function to handle event deletion.
   */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event._id);
    }
  };

  // Format event date to a human-readable format
  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });

  return (
    <div className="event">
      <div className='event-header'>
        <span className='date'>{eventDate}</span>
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
