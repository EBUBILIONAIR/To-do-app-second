import { useState } from 'react'
import { useAppData } from './LocalStorage'
import UserModal from './UserModal'

export default function UserList() {
  const { users, deleteUser } = useAppData()
  const [editingUser, setEditingUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
      // Reset to first page if current page becomes empty
      if ((users.length - 1) % usersPerPage === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(users.length / usersPerPage)
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="user-list-details mt-6">
      <div className="overflow-x-auto">
        <table className="w-full rounded">
          <thead>
            <tr className="border-b border-gray-700 text-[#6C7293]">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody id="user-list-body">
            {currentUsers.length > 0 ? (
              currentUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.createdAt}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => setEditingUser(user.id)} 
                      className="bg-orange-600 hover:bg-orange-500 py-[6px] px-3 my-0 mr-2 ml-0 rounded-md cursor-pointer"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)} 
                      className="bg-red-600 hover:bg-red-500 py-[6px] px-3 rounded-md cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-white">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`bg-[#2A3038] text-white px-3 py-1.5 rounded ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3b424b] cursor-pointer'
          }`}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`bg-[#2A3038] text-white px-3 py-1.5 rounded ${
            currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3b424b] cursor-pointer'
          }`}
        >
          Next
        </button>
      </div>
      
      {editingUser && (
        <UserModal 
          userId={editingUser} 
          onClose={() => setEditingUser(null)} 
        />
      )}
    </div>
  )
}