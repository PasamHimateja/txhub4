import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Persistent storage for the last seen student count
  const [lastSeenCount, setLastSeenCount] = useState(() => {
    return parseInt(localStorage.getItem('lastSeenCount') || '0', 10);
  });

  const fetchStudentCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/enrollments/');
      const result = await response.json();
      const dataArray = Array.isArray(result) ? result : result.data;
      setStudentCount((dataArray || []).length);
    } catch (err) {
      console.error("Context Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudentCount();
  }, [fetchStudentCount]);

  // Calculate new users count (ensure it's not negative)
  const newCount = Math.max(0, studentCount - lastSeenCount);

  const markAsSeen = () => {
    setLastSeenCount(studentCount);
    localStorage.setItem('lastSeenCount', studentCount.toString());
  };

  return (
    <AdminContext.Provider value={{
      studentCount,
      newCount,
      loading,
      markAsSeen,
      refreshCount: fetchStudentCount
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
