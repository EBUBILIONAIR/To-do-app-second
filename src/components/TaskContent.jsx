import { useState } from 'react'
import TaskModal from './TaskModal'
import TaskList from './TaskList'
import { useAppData } from './LocalStorage'

export default function TaskContent() {
  const [showModal, setShowModal] = useState(false)
  const { users, projects } = useAppData()

  const [filters, setFilters] = useState({
    title: '',
    user: '',
    status: 'All Statuses',
    priority: 'All Priorities',
    project: ''
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div id="task-content" className="content-section bg-black p-[1.875rem_1.75rem] w-full flex-grow">
      <div className="app-list-task px-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0090e7] text-white px-3 py-2 rounded mb-4  cursor-pointer"
        >
          Create Task
        </button>

        <div className="flex flex-wrap items-center mb-4 mx-[-12px]">
          <div className="px-3 mb-2 w-full md:w-auto md:flex-1">
            <input
              type="text"
              className="bg-[#2A3038] text-white p-[10px_11px] w-full rounded"
              placeholder="Search by title"
              value={filters.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
            />
          </div>
          <div className="px-3 mb-2 w-full md:w-auto">
            <select
              id="task-users"
              className="w-full bg-[#2a3038] border border-[#2c2e33] rounded text-white p-[0.375rem_0.75rem]"
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
            >
              <option value="">All Users</option>
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="px-3 mb-2 w-full md:w-auto">
            <select
              id="task-status"
              className="w-full bg-[#2a3038] border border-[#2c2e33] rounded text-white p-[0.375rem_0.75rem]"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option>All Statuses</option>
              <option>Todo</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="px-3 mb-2 w-full md:w-auto">
            <select
              id="task-priority"
              className="w-full bg-[#2a3038] border border-[#2c2e33] rounded text-white p-[0.375rem_0.75rem]"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="px-3 mb-2 w-full md:w-auto">
            <select
              id="task-projects"
              className="w-full bg-[#2a3038] border border-[#2c2e33] rounded text-white p-[0.375rem_0.75rem]"
              value={filters.project}
              onChange={(e) => handleFilterChange('project', e.target.value)}
            >
              <option value="">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.name}>{project.name}</option>
              ))}
            </select>
          </div>
        </div>

        <TaskList filters={filters} />
      </div>

      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
