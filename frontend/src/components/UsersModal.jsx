import { useState } from 'react';
import './userModal.css';

/**
 * Component for displaying and managing user information.
 * 
 * @param {Object} props - Component props.
 * @param {Array} props.admins - Array of admin users.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onDelete - Function to delete a user.
 * @param {Function} props.onEdit - Function to edit a user.
 * @returns {JSX.Element} - Returns the UsersModal component.
 */
export default function UsersModal({ admins, onClose, onDelete, onEdit }) {
  const [editedUserData, setEditedUserData] = useState({}); // State for edited user data
  const [showEditUserModal, setShowEditUserModal] = useState(false); // State for showing edit user modal

  /**
   * Function to handle edit button click.
   * 
   * @param {Object} admin - Admin user object.
   */
  const handleEditClick = (admin) => {
    setEditedUserData(admin);
    setShowEditUserModal(true);
  };

  /**
   * Function to handle closing edit modal.
   */
  const handleCloseEditModal = () => {
    setEditedUserData({});
    setShowEditUserModal(false);
  };

  /**
   * Function to handle input changes.
   * 
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };

  /**
   * Function to handle saving edited user data.
   */
  const handleSaveUser = () => {
    onEdit(editedUserData, editedUserData._id);
    handleCloseEditModal();
  };

  return (
    <div className='admin-modal'>
      <div className='admin-modal-content'>
        <span className='close-admin' onClick={onClose}>&times;</span>
        <div className='admins-list'>
          {admins.map(admin => (
            <div key={admin._id} className='admin-info'>
              <span>{admin.email}</span>
              <div className='admin-buttons'>
                <button className='edit-button' onClick={() => handleEditClick(admin)}>Edit</button>
                <button className='delete-button' onClick={() => onDelete(admin._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showEditUserModal && (
        <div className='edit-user-modal'>
          <div className='edit-user-modal-content'>
            <input type='text' name='email' value={editedUserData.email} onChange={handleChange} placeholder='Enter your new email' />
            <input type='text' name='username' value={editedUserData.username} onChange={handleChange} placeholder='Enter your new username' />
            <input type='password' name='password' value={''} onChange={handleChange} placeholder='Enter your new password' />
            <div className='edit-modal-buttons'>
              <button className='cancel-button' onClick={handleCloseEditModal}>Cancel</button>
              <button className='save-button' onClick={handleSaveUser}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
