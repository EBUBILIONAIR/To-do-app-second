import { useState, useEffect } from 'react'
import { useAppData } from './LocalStorage'

export default function ProjectModal({ onClose, projectId }) {
  const { addProject, updateProject, projects } = useAppData()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'select status',
    priority: 'select priority'
  })

  // Load project data when projectId changes
  useEffect(() => {
    if (projectId) {
      const projectToEdit = projects.find(project => project.id === projectId)
      if (projectToEdit) {
        setFormData({
          name: projectToEdit.name || '',
          description: projectToEdit.description || '',
          startDate: projectToEdit.startDate || '',
          endDate: projectToEdit.endDate || '',
          status: projectToEdit.status || 'select status',
          priority: projectToEdit.priority || 'select priority'
        })
      }
    }
  }, [projectId, projects])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const { name, description, startDate, endDate, status, priority } = formData
    if (!name || !description || !startDate || !endDate || status === 'select status' || priority === 'select priority') {
      alert('Please fill all fields')
      return
    }

    if (projectId) {
      updateProject(projectId, { ...formData, id: projectId })
    } else {
      addProject({ ...formData, id: Date.now().toString() })
    }

    onClose()
  }

  return (
    <div id="project-modal" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-black rounded-lg shadow-xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h5 className="text-lg font-semibold text-white">
            {projectId ? 'Edit Project' : 'Create new project'}
          </h5>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Project Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-[#2A3038] border border-[#2c2e33] rounded text-white text-sm"
                    placeholder="Project name" 
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Description</label>
                  <input 
                    type="text" 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-[#2A3038] border border-[#2c2e33] rounded text-white text-sm"
                    placeholder="Description" 
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Start Date</label>
                  <input 
                    type="date" 
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-[#2A3038] border border-[#2c2e33] rounded text-white text-sm"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">End Date</label>
                  <input 
                    type="date" 
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-[#2A3038] border border-[#2c2e33] rounded text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-[#2a3038] border border-[#2c2e33] rounded text-white text-sm"
                  >
                    <option value="select status">Select status</option>
                    <option value="todo">Todo</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Priority</label>
                  <select 
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-[#2a3038] border border-[#2c2e33] rounded text-white text-sm"
                  >
                    <option value="select priority">Select priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="cursor-pointer mt-4 px-4 py-2 text-sm font-medium text-white bg-[#0090e7] rounded hover:bg-[#0077cc]"
            >
              Save
            </button>
          </div>
          
          {/* Modal Footer */}
          <div className="p-4 border-t border-gray-700 flex justify-end">
            <button 
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-300 bg-[#2A3038] rounded hover:bg-[#3b424b]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}