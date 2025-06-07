import { useState, useEffect } from 'react'
import { useAppData } from './LocalStorage'

export default function TaskModal({ onClose, taskId }) {
  const { addTask, updateTask, tasks, projects, users } = useAppData()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'select status',
    priority: 'select priority',
    project: 'select project',
    assignTo: 'select user'
  })

  useEffect(() => {
    if (taskId) {
      const taskToEdit = tasks.find(task => task.id === taskId)
      if (taskToEdit) {
        setFormData(taskToEdit)
      }
    }
  }, [taskId, tasks])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fields = Object.entries(formData)
    if (fields.some(([key, value]) => value.toLowerCase().includes('select') || !value.trim())) {
      alert('Please fill all fields')
      return
    }

    if (taskId) {
      updateTask(taskId, { ...formData, id: taskId })
    } else {
      addTask({ ...formData, id: Date.now().toString() })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1e1e2f] w-full max-w-4xl rounded shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-700">
          <h5 className="text-lg font-semibold text-white">
            {taskId ? 'Edit Task' : 'Create New Task'}
          </h5>
          {/* <button onClick={onClose} className="text-white text-xl font-bold">&times;</button> */}
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Row 1: Title, Description, Start Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                  placeholder="Task title"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                  placeholder="Description"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                />
              </div>
            </div>

            {/* Row 2: End Date, Status, Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                >
                  <option value="select status">Select status</option>
                  <option value="todo">Todo</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                >
                  <option value="select priority">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Row 3: Project, Assign To, Save Button */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-white font-medium mb-2">Project</label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                >
                  <option value="select project">Select project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.name}>{project.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Assign To</label>
                <select
                  name="assignTo"
                  value={formData.assignTo}
                  onChange={handleChange}
                  className="w-full bg-[#2A3038] text-white p-2 rounded"
                >
                  <option value="select user">Select user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>

              {/* Save Button (left aligned) */}
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-[#0090e7] text-white px-4 py-2 rounded mt-6 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer with Cancel Button (right aligned) */}
          <div className="px-6 py-4 border-t border-gray-700 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded  cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
