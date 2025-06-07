'use client';
import React, { useState } from 'react';
import ProjectManager from '@/components/ProjectSection';
import TaskManager from '@/components/TaskManager';
import UserManagement from '@/components/UserContent';

export default function MainContent({ activeTab, projects, setProjects }) {
  const renderContent = () => {
    switch (activeTab) {
      case 'project':
        return <ProjectManager />;
      case 'task':
        return <TaskManager />;
      case 'user':
        return <UserManagement />;
      case 'dashboard':
      default:
        return (
          <div className="p-[30px_28px]"> 
            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow rounded py-[28px] px-[25px] flex flex-col"
                >
                  <div className="flex items-center mb-1">
                    <h3 className="text-xl font-semibold py-0 px-3">1234</h3>
                    <img src="icon.jpg" alt="Icon" className="w-5 h-5 ml-2" />
                  </div>
                  <p className="text-sm text-gray-500 px-3">Users</p>
                </div>
              ))}
            </div>

            {/* Projects Section */}
            <div className="bg-white shadow rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold">Projects</h5>
                <p className="text-sm text-gray-500">Project timeline status</p>
              </div>

              <div className="flex items-start gap-4 py-4 border-t">
                <img src="/icons/file.png" alt="Update Icon" className="w-6 h-6 mt-1" />
                <div className="flex-1">
                  <h6 className="text-md font-semibold mb-1">Update Title</h6>
                  <p className="text-sm text-gray-600 mb-2">
                    Brief update description goes here.
                  </p>
                </div>
                <div className="text-sm text-gray-400">2h ago</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 overflow-auto bg-green-700 py-[30px] px-[28px]">
      {renderContent()}
    </main>
  );
}