"use client";
import { createContext, useContext, useEffect, useState } from 'react'


const LocalStorageContext = createContext()

export function LocalStorageProvider({ children }) {
  const [appData, setAppData] = useState({
    projects: [],
    tasks: [],
    users: []
  })

  useEffect(() => {
    const savedData = getFromLocalStorage('dashboardData')
    if (savedData) {
      setAppData({
        projects: savedData.projects || [],
        tasks: savedData.tasks || [],
        users: savedData.users || []
      })
    }
  }, [])

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  // Add a default value in case the context is undefined
  const value = {
    ...appData,
    addProject: (project) => {
      const newProjects = [...appData.projects, project]
      setAppData(prev => ({ ...prev, projects: newProjects }))
      saveToLocalStorage('dashboardData', { ...appData, projects: newProjects })
    },
    updateProject: (id, updatedProject) => {
      const newProjects = appData.projects.map(p => 
        p.id === id ? updatedProject : p
      )
      setAppData(prev => ({ ...prev, projects: newProjects }))
      saveToLocalStorage('dashboardData', { ...appData, projects: newProjects })
    },
    deleteProject: (id) => {
      const newProjects = appData.projects.filter(p => p.id !== id)
      setAppData(prev => ({ ...prev, projects: newProjects }))
      saveToLocalStorage('dashboardData', { ...appData, projects: newProjects })
    },
    addTask: (task) => {
      const newTasks = [...appData.tasks, task]
      setAppData(prev => ({ ...prev, tasks: newTasks }))
      saveToLocalStorage('dashboardData', { ...appData, tasks: newTasks })
    },
    updateTask: (id, updatedTask) => {
      const newTasks = appData.tasks.map(t => 
        t.id === id ? updatedTask : t
      )
      setAppData(prev => ({ ...prev, tasks: newTasks }))
      saveToLocalStorage('dashboardData', { ...appData, tasks: newTasks })
    },
    deleteTask: (id) => {
      const newTasks = appData.tasks.filter(t => t.id !== id)
      setAppData(prev => ({ ...prev, tasks: newTasks }))
      saveToLocalStorage('dashboardData', { ...appData, tasks: newTasks })
    },
    addUser: (user) => {
      const newUsers = [...appData.users, user]
      setAppData(prev => ({ ...prev, users: newUsers }))
      saveToLocalStorage('dashboardData', { ...appData, users: newUsers })
    },
    updateUser: (id, updatedUser) => {
      const newUsers = appData.users.map(u => 
        u.id === id ? updatedUser : u
      )
      setAppData(prev => ({ ...prev, users: newUsers }))
      saveToLocalStorage('dashboardData', { ...appData, users: newUsers })
    },
    deleteUser: (id) => {
      const newUsers = appData.users.filter(u => u.id !== id)
      setAppData(prev => ({ ...prev, users: newUsers }))
      saveToLocalStorage('dashboardData', { ...appData, users: newUsers })
    }
  }

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  )
}

// Add a safety check for the context
export function useAppData() {
  const context = useContext(LocalStorageContext)
  if (context === undefined) {
    throw new Error('useAppData must be used within a LocalStorageProvider')
  }
  return context
}