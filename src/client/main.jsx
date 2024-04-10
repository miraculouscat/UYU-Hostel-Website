import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminUser from './pages/admin/AdminUser.jsx'
import AdminMaintenance from './pages/admin/AdminMaintenance.jsx';
import AdminRoom from './pages/admin/AdminRoom.jsx';
import AdminReport from './pages/admin/AdminReport.jsx';
import UserApp from './pages/user/UserApp.jsx'
import AdminHome from './pages/admin/AdminHome.jsx';
import LoginPage from './pages/index/LoginPage.jsx';


const router = createBrowserRouter([
  {
    path: "/admin/user",
    element: <AdminUser />
  },
  {
    path: "/admin/maintenance",
    element: <AdminMaintenance />
  },
  {
    path: "/admin/room",
    element: <AdminRoom />
  },
  {
    path: "/admin/report",
    element: <AdminReport />
  },
  {
    path: "/user",
    element: <UserApp />
  },
  {
    path: "/admin",
    element: <AdminHome/>
  },
  {
    path: "/index",
    element: <LoginPage/>
  },
  {
    path: "/",
    element: <LoginPage/>
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
} else {
  console.error("No root element found");
}
