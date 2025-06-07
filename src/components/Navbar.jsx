'use client'

import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <nav className="navbar bg-[#191c24] text-white h-[70px] flex items-center justify-between px-4">
      {/* Hamburger Menu */}
      <a href="#" className="p-1 md:hidden">
        <img src="/hamburger.png" alt="Menu" className="w-6 h-6" />
      </a>

      {/* Search Input */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          className="bg-[#191c24] text-white px-4 py-2 rounded-md w-full max-w-xs border border-gray-700 focus:border-gray-600 focus:outline-none"
          placeholder="Search projects"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <a href="#" className="p-2">
          <img src="/icons/dashboard-h.png" alt="Dashboard" className="w-6 h-6" />
        </a>
       <a href="#" className="p-2">
  <img src="/icons/message.png" alt="Messages" className="w-6 h-6" />

</a>

        <a href="#" className="p-2">
          <img src="/icons/notification.png" alt="Notifications" className="w-6 h-6" />
        </a>

        {/* Profile Dropdown */}
         <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Drop Container (clickable area) */}
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 cursor-pointer"
      >
        {/* Profile Image Container */}
       <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
  <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
</div>

        {/* Text Container */}
        <div className="text-sm font-medium text-white">Ebube Louis</div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#191c24] border rounded-md border-none z-50 shadow-lg">
          {/* Profile Text */}
          <div className="p-[16px] text-sm text-white font-semibold border-b border-gray-700">Profile</div>

          {/* Settings Option */}
         <div 
          className="project py-[11px] px-[13px] flex items-center cursor-pointer hover:bg-[#14161c] border-b border-gray-700"
        >
          <div className="icon-container mr-2 ">
            <img src="/icons/settings.png" alt="Settins" className="w-5 h-5" />
          </div>
          <p className="m-0">Settings</p>
        </div>

          {/* Log Out Option */}
         
<div 
          className="project py-[11px] px-[13px] flex items-center cursor-pointer hover:bg-[#14161c] border-b border-gray-700"
        >
          <div className="icon-container mr-2">
            <img src="/icons/log-out.png" alt="Project" className="w-5 h-5" />
          </div>
          <p className="m-0">Log Out</p>
        </div>

          {/* Advanced Setting Text */}
          <div className="p-[16px] text-sm text-white">
            Advanced Setting
          </div>
        </div>
      )}
    </div>

      </div>
    </nav>
  )
}
