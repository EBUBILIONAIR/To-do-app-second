import { useEffect, useState } from 'react'
import { useAppData } from './LocalStorage'

export default function Dashboard() {
  const { projects, tasks, users } = useAppData()
  const [userCount, setUserCount] = useState(0)
  const [projectCount, setProjectCount] = useState(0)
  const [taskCount, setTaskCount] = useState(0)

  useEffect(() => {
    setUserCount(users?.length || 0)
    setProjectCount(projects?.length || 0)
    setTaskCount(tasks?.length || 0)
  }, [projects, tasks, users])

  return (
    <div id="dashboard-content" className="content-section p-[30px_28px]">
      <div className="app-dashboard px-3">
        {/* Cards */}
        <div className="kart mx-[-12px] flex flex-wrap">
          {[
            { label: 'Users', count: userCount },
            { label: 'Projects', count: projectCount },
            { label: 'Tasks', count: taskCount },
          ].map(({ label, count }) => (
            <div key={label} className="card mb-6 px-3 w-full md:w-1/3">
              <div className="card-body bg-[#191c24] p-[28px_25px] rounded">
                <div className="flex justify-between items-center">
                  <div className="digit px-3">
                    <h3 className="text-2xl font-bold">{count}</h3>
                  </div>
                 <div className="icon px-2">
  <img src="/icons/left.png" alt="Icon" className="w-6 h-6" />
</div>

                </div>
                <h6 className="mb-2 text-gray-400">{label}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="jects bg-[#191c24] p-[28px_25px] rounded mt-6">
          <div className="slice flex justify-between items-center mb-4">
            <h5 className="m-0 mb-1 text-lg font-semibold">Projects</h5>
            <p className="m-0 text-gray-400">Project timeline status</p>
          </div>

          {/* No projects message */}
          {projects?.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-6">No projects created yet.</p>
          )}

          {/* List of projects */}
          {projects?.map((project) => (
            <div key={project.id} className="project-updates py-4 border-t border-gray-700">
              <div className="flex items-center">
               <div className="icon pl-4 bg-blue-700 flex items-center justify-center h-12 w-12 rounded">
  <img src="/icons/file.png" alt="Icon" className="w-8 h-8 mr-3.5" />
</div>

                <div className="listing flex-1 px-4">
                  <h6 className="m-0 mb-2">{project.name}</h6>
                  <p className="m-0 text-gray-400">{project.description}</p>
                </div>
                <p className="m-0 mb-2 text-gray-400">
                  Due: {project.endDate || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
