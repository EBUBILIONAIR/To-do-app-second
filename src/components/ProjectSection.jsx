import { useState } from 'react'
import ProjectModal from './ProjectModal'
import ProjectList from './ProjectList'

export default function ProjectSection() {
  const [showModal, setShowModal] = useState(false)

  // State for filters
  const [filters, setFilters] = useState({
    title: '',
    status: 'All Statuses',
    priority: 'All Priorities',
  })

  const handleFilterChange = (e) => {
    const { id, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  return (
    <div id="project-content" className="content-section p-[30px_28px] relative">
      <div className="app-list-project px-3">
        <div className="relative mb-4">
          <button 
            onClick={() => setShowModal(true)} 
            className="relative z-10 bg-[#0090e7] hover:bg-[#0080d0] text-white px-3 py-2 rounded transition-colors"
          >
            Add Project
          </button>
        </div>
        <hr className="border-gray-700 mb-4" />

        {/* Filters */}
        <div className="flex flex-wrap mb-4">
          <div className="px-3 w-full md:w-64">
            <input 
              type="text" 
              id="title"
              className="bg-[#2A3038] text-white p-[10px_11px] w-full rounded" 
              placeholder="Search by title"
              value={filters.title}
              onChange={handleFilterChange}
            />
          </div>

          <div className="px-3 w-full md:w-64">
            <select 
              id="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full bg-[#2a3038] border border-[#2c2e33] rounded text-white text-lg p-[0.625rem_1rem] cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Todo</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="px-3 w-full md:w-64">
            <select
              id="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full bg-[#2a3038] border border-[#2c2e33] rounded text-white text-lg p-[0.625rem_1rem] cursor-pointer"
            >
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <button
            className="bg-[#E4EAEC] text-black px-3 py-1.5 rounded h-[38px] cursor-pointer"
            onClick={() => console.log('Filters applied:', filters)} // Optional
          >
            Filter
          </button>
        </div>

        {/* Project List */}
        <ProjectList filters={filters} />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50">
          <ProjectModal onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  )
}
