import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const role =
    localStorage.getItem("role");

  const token =
    localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/"
      />
    );
  }

  if (role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
      />
    );
  }

  return children;
}

export default AdminRoute;
