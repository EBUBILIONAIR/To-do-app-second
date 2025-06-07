import { useState } from 'react'
import UserModal from './UserModal'
import UserList from './UserList'

export default function UserContent() {
  const [showModal, setShowModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  return (
    <div
      id="users-content"
      className="content-section bg-black p-[1.875rem_1.75rem] w-full flex-grow"
    >
      <div className="app-list-users px-3">
        <button
          onClick={() => {
            setSelectedUserId(null)  // Clear any selected user
            setShowModal(true)
          }}
          className="bg-[#0090e7] text-white px-3 py-2 rounded mb-4"
        >
          Create User
        </button>

       <div className="search mb-2 w-64">
  <input
    type="text"
    className="bg-[#2A3038] text-white px-3 py-2 w-full text-sm rounded"
    placeholder="Search..."
  />
</div>


        <UserList onEditUser={(userId) => {
          setSelectedUserId(userId)
          setShowModal(true)
        }} />
      </div>

      {showModal && (
        <UserModal
          userId={selectedUserId}
          onClose={() => {
            setShowModal(false)
            setSelectedUserId(null)
          }}
        />
      )}
    </div>
  )
}
