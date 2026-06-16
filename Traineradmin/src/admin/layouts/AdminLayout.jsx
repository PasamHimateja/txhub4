import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 min-h-screen">
        <Outlet /> {/* This is where Dashboard, Users, etc. will render */}
      </main>
    </div>
  );
};

export default AdminLayout;