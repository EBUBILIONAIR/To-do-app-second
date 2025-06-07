'use client'

import { useState } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ProjectSection from "@/components/ProjectSection";
import TaskContent from "@/components/TaskContent";
import UserContent from "@/components/UserContent";

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const loadContent = (section) => {
    setActiveSection(section)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white font-rubik">
      <Sidebar loadContent={loadContent} activeSection={activeSection} />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'project' && <ProjectSection />}
          {activeSection === 'task' && <TaskContent />}
          {activeSection === 'users' && <UserContent />}
        </div>
        
        <Footer />
      </div>
    </div>
  )
}
