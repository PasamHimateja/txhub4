import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MentorDashboard from './pages/MentorDashboard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminApp from './admin/App';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MentorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
