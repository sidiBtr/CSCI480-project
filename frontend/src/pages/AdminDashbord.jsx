import React, { useState, useEffect } from 'react';
import AddEvent from '../components/AddEvent';
import EventAdmin from '../components/EventAdmin';
import UsersModal from '../components/UsersModal';
import './eventDasbord.css';
import AddUser from '../components/AddUser';
import { useNavigate } from 'react-router-dom';

/**
 * Component for the admin dashboard.
 * 
 * @returns {JSX.Element} - Returns the AdminDashboard component.
 */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); // State for events
  const [adminUsers, setAdminUsers] = useState([]); // State for admin users
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [showAddEventModal, setShowAddEventModal] = useState(false); // State for showing add event modal
  const [showUserModal, setShowUserModal] = useState(false); // State for showing user modal
  const [showAddUserModal, setShowAddUserModal] = useState(false); // State for showing add user modal
  const api = import.meta.env.VITE_API_KEY;

  // Fetch admin users and events from backend
  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${api}/api/events/allEvents`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch admin users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${api}/api/user/admins`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setAdminUsers(data.admins);
    } catch (error) {
      console.error(error);
    }
  };

  // Handlers for showing and closing modals
  const handleAddEventClick = () => setShowAddEventModal(true);
  const handleCloseAddEventModal = () => setShowAddEventModal(false);
  const handleClickAdmins = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);
  const handleAddUserClick = () => setShowAddUserModal(true);
  const handleCloseAddUserModal = () => setShowAddUserModal(false);

  // Edit a particular admin user
  const handleEditUser = async (userId, editedUserData) => {
    try {
      const response = await fetch(`${api}/api/user/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUserData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      setAdminUsers(adminUsers.map(user => user._id === userId ? editedUserData : user));
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (adminId) => {
    try {
      const response = await fetch(`${api}/api/user/delete/${adminId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete a user');
      }
      setAdminUsers(adminUsers.filter(user => user._id !== adminId));
    } catch (error) {
      console.log(error);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${api}/api/events/deleteEvent/${eventId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  // Edit an event
  const handleEditEvent = async (eventId, editedEvent) => {
    try {
      const response = await fetch(`${api}/api/events/updateEvent/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedEvent)
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      setEvents(events.map(event => event._id === eventId ? editedEvent : event));
      console.log(`Event with ID ${eventId} updated successfully.`);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-buttons">
          <div className="dashboard-button" onClick={handleAddEventClick}>Add Event</div>
          <div className="dashboard-button" onClick={handleClickAdmins}>Admins</div>
          <div className='dashboard-button' onClick={handleAddUserClick}>Add User</div>
          <div className='dashboard-button' onClick={handleLogout}>Log out</div>
        </div>
      </div>
      {showAddEventModal && <AddEvent onClose={handleCloseAddEventModal} />}
      {showAddUserModal && <AddUser onClose={handleCloseAddUserModal} />}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="events-list">
          {events.map(event => (
            <EventAdmin
              key={event._id}
              event={event}
              onDelete={() => handleDeleteEvent(event._id)}
              onEdit={(editedEvent) => handleEditEvent(event._id, editedEvent)}
            />
          ))}
        </div>
      )}
      {showUserModal && (
        <UsersModal
          admins={adminUsers}
          onClose={handleCloseUserModal}
          onDelete={(adminId) => handleDeleteUser(adminId)}
          onEdit={(editedUserData) => handleEditUser(editedUserData._id, editedUserData)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
