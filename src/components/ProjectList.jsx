import { useState } from 'react'
import { useAppData } from './LocalStorage'
import ProjectModal from './ProjectModal'

export default function ProjectList({ filters }) {
  const { projects, deleteProject } = useAppData()
  const [editingProject, setEditingProject] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 5

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id)
      // Reset to first page if current page becomes empty
      if (filteredProjects.length % projectsPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  const filteredProjects = projects.filter((project) => {
    const titleMatch = project.name.toLowerCase().includes(filters.title.toLowerCase())
    const statusMatch =
      filters.status === 'All Statuses' || project.status.toLowerCase() === filters.status.toLowerCase()
    const priorityMatch =
      filters.priority === 'All Priorities' || project.priority.toLowerCase() === filters.priority.toLowerCase()

    return titleMatch && statusMatch && priorityMatch
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

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
    <div className="project-list-details mt-6">
      <div className="overflow-x-auto">
        <table className="w-full rounded">
          <thead>
            <tr className="border-b border-gray-700 text-[#6C7293]">
              <th className="p-3 text-left">Project Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Start</th>
              <th className="p-3 text-left">End</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project) => (
              <tr key={project.id} className="border-b border-gray-700">
                <td className="p-3">{project.name}</td>
                <td className="p-3">{project.description}</td>
                <td className="p-3">{project.startDate}</td>
                <td className="p-3">{project.endDate}</td>
                <td className="p-3">{project.status}</td>
                <td className="p-3">{project.priority}</td>
                <td className="p-3">
                  <button
                    onClick={() => setEditingProject(project.id)}
                    className="bg-orange-600 hover:bg-orange-500 py-[6px] px-3 my-0 mr-2 ml-0 rounded-md cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 hover:bg-red-500 py-[6px] px-3 rounded-md cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
        <span>Page {currentPage} of {totalPages || 1}</span>
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

      {editingProject && (
        <ProjectModal
          projectId={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  )
}