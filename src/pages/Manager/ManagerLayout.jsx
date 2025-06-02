import React from 'react'

import SideBarManager from '../../components/SideBar/SideBarManager'
import { Outlet } from 'react-router'

function ManagerLayout() {
  return (
    <div className="flex h-screen">
      <SideBarManager/>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default ManagerLayout
