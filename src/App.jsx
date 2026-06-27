import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Leave from "./pages/Leave";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import OfficeSettings from "./pages/OfficeSettings";
import Late from "./pages/Late";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            Public Routes
        ========================== */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* =========================
            Protected Employee Routes
        ========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/late"
          element={
            <ProtectedRoute>
              <Late />
            </ProtectedRoute>
          }
        />

        {/* =========================
            Admin Routes
        ========================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <AdminRoute>
              <Employees />
            </AdminRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <AdminRoute>
              <AddEmployee />
            </AdminRoute>
          }
        />

        <Route
          path="/office"
          element={
            <AdminRoute>
              <OfficeSettings />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;