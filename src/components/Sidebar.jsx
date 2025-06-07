export default function Sidebar({ loadContent, activeSection }) {
  return (
    <div className="sidebar fixed h-full w-64 left-0 top-0 bg-[#191c24] text-white flex flex-col">
       {/* Logo Section - Updated */}
      <div className="logo p-4">
        <img 
          src="/icons/logo.png" 
          alt="logo" 
          className="w-full max-w-[180px] h-auto object-contain" 
        />
      </div>


      
      <div className="profile-sidebar p-5 flex items-center">
       <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
  <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
</div>
        <div className="ml-4">
          <h5 className="m-0 text-white">Ebube Louis</h5>
          <p className="m-0 text-gray-400 text-sm">Admin</p>
        </div>
      </div>
      
      <div className="navigation">
        <div className="py-2 px-[19.008px]">
 <p className="text-[#6c7293] text-sm uppercase font-medium pt-[12.8px] pr-[10px] pb-[12.8px] pl-0">Navigation</p>
        </div>
       
        
        <div 
          className={`dashboard pt-[12.8px] pr-[10px] pb-[12.8px] pl-[19.008px] flex items-center cursor-pointer sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`} 
          onClick={() => loadContent('dashboard')}
        >
          <div className="icon-container my-0 mr-2 ml-0">
            <img src="/icons/dashboard-s.png" alt="Dashboard" className="w-5 h-5" />
          </div>
          <p className="m-0 text-gray-400">Dashboard</p>
        </div>
        
        <div 
          className={`project pt-[12.8px] pr-[10px] pb-[12.8px] pl-[19.008px] flex items-center cursor-pointer sidebar-item ${activeSection === 'project' ? 'active' : ''}`} 
          onClick={() => loadContent('project')}
        >
          <div className="icon-container mr-2">
            <img src="/icons/laptop.png" alt="Project" className="w-5 h-5" />
          </div>
          <p className="m-0 text-gray-400">Project</p>
        </div>
        
        <div 
          className={`task pt-[12.8px] pr-[10px] pb-[12.8px] pl-[19.008px] flex items-center cursor-pointer sidebar-item ${activeSection === 'task' ? 'active' : ''}`} 
          onClick={() => loadContent('task')}
        >
          <div className="icon-container mr-2">
            <img src="/icons/task.png" alt="Task" className="w-5 h-5" />
          </div>
          <p className="m-0 text-gray-400">Task</p>
        </div>
        
        <div 
          className={`users pt-[12.8px] pr-[10px] pb-[12.8px] pl-[19.008px] flex items-center cursor-pointer sidebar-item ${activeSection === 'users' ? 'active' : ''}`} 
          onClick={() => loadContent('users')}
        >
          <div className="icon-container my-0 mr-2 ml-0">
            <img src="/icons/users.png" alt="Users" className="w-5 h-5" />
          </div>
          <p className="m-0 text-gray-400">Users</p>
        </div>
      </div>
    </div>
  )
}