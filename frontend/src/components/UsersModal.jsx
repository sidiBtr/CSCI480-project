import { useState } from 'react';
import './userModal.css';

export default function UsersModal({ admins, onClose, onDelete, onEdit }) {
  const [editedUserData, setEditedUserData] = useState({});
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const handleEditClick = (admin) => {
    setEditedUserData(admin);
    setShowEditUserModal(true);
  };

  const handleCloseEditModal = () => {
    setEditedUserData({});
    setShowEditUserModal(false);
  };

  const handleChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };
  const handleSaveUser = () => {
    onEdit(editedUserData, editedUserData._id)
    handleCloseEditModal()
  }

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
