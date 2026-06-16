// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   // User not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // User is not admin
//   if (!user.isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   // Admin access allowed
//   return children;
// };

// export default AdminRoute;