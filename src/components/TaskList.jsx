import { useState } from 'react'
import { useAppData } from './LocalStorage'
import TaskModal from './TaskModal'

export default function TaskList({ filters }) {
  const { tasks, deleteTask } = useAppData()
  const [editingTask, setEditingTask] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5

  const filteredTasks = tasks.filter(task => {
    const titleMatch = task.title.toLowerCase().includes(filters.title.toLowerCase())
    const userMatch = !filters.user || task.assignTo === filters.user
    const statusMatch = filters.status === 'All Statuses' || task.status === filters.status
    const priorityMatch = filters.priority === 'All Priorities' || task.priority === filters.priority
    const projectMatch = !filters.project || task.project === filters.project

    return titleMatch && userMatch && statusMatch && priorityMatch && projectMatch
  })

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id)
      // Reset to first page if current page becomes empty
      if (filteredTasks.length % tasksPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask)

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
    <div className="task-list-details mt-6">
      <div className="overflow-x-auto">
        <table className="w-full rounded">
          <thead>
            <tr className="border-b border-gray-700 text-[#6C7293]">
              <th className="p-[15px] text-left">Title</th>
              <th className="p-[15px] text-left">Description</th>
              <th className="p-[15px]">Start Date</th>
              <th className="p-[15px] text-left">Due Date</th>
              <th className="p-[15px] text-left">Assign To</th>
              <th className="p-[15px] text-left">Project</th>
              <th className="p-[15px] text-left">Status</th>
              <th className="p-[15px] text-left">Priority</th>
              <th className="p-[15px] text-left">Actions</th>
            </tr>
          </thead>
          <tbody id="task-list-body">
            {currentTasks.length > 0 ? (
              currentTasks.map(task => (
                <tr key={task.id} className="border-b border-gray-700">
                  <td className="p-3 whitespace-nowrap">{task.title}</td>
                  <td className="p-3 whitespace-nowrap">{task.description}</td>
                  <td className="p-3 whitespace-nowrap">{task.startDate}</td>
                  <td className="p-3 whitespace-nowrap">{task.endDate}</td>
                  <td className="p-3 whitespace-nowrap">{task.assignTo}</td>
                  <td className="p-3 whitespace-nowrap">{task.project}</td>
                  <td className="p-3 whitespace-nowrap">
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => setEditingTask(task.id)}
                      className="bg-orange-600 hover:bg-orange-500 py-[6px] px-3 my-0 mr-2 ml-0 rounded-md cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-600 hover:bg-red-500 py-[6px] px-3 rounded-md cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-center text-white">No tasks match the filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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

      {editingTask && (
        <TaskModal taskId={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </div>
  )
}