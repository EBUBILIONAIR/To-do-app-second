"use client"
import React, { useState, useEffect } from 'react'
import { useAppData } from './LocalStorage'


export default function UserModal({ onClose, userId }) {
  const { addUser, updateUser, users } = useAppData()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Select Role'
  })

  useEffect(() => {
    if (userId) {
      const userToEdit = users.find(user => user.id === userId)
      if (userToEdit) {
        setFormData(userToEdit)
      }
    }
  }, [userId, users])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || formData.role === 'Select Role') {
      alert('Please fill all fields')
      return
    }

    const userData = {
      ...formData,
      id: userId || Date.now().toString(),
      createdAt: userId ? formData.createdAt : new Date().toLocaleDateString()
    }

    if (userId) {
      updateUser(userId, userData)
    } else {
      addUser(userData)
    }

    onClose()
  }

  return (
    // Backdrop and modal wrapper
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#1f1f1f] text-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="modal-header p-5 flex justify-between items-center border-b border-gray-700">
          <h5 className="text-lg font-semibold">
            {userId ? 'Edit User' : 'Add New User'}
          </h5>
          <button onClick={onClose} className="text-white text-2xl">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body p-6 space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#2A3038] text-white p-3 rounded"
              placeholder="Name"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#2A3038] text-white p-3 rounded"
              placeholder="Email"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-[#2A3038] text-white p-3 rounded"
            >
              <option>Select Role</option>
              <option>Admin</option>
              <option>User</option>
              <option>Guest</option>
            </select>
          </div>

          {/* Footer */}
          <div className="modal-footer p-4 border-t border-gray-700 flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-[#0090e7] hover:bg-[#007ec1] text-white px-4 py-2 rounded"
            >
              {userId ? 'Update User' : 'Add User'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
