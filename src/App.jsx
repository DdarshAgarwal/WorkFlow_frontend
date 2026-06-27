import {
  Suspense,
  lazy,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Leave = lazy(() => import("./pages/Leave"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const Employees = lazy(() => import("./pages/Employees"));
const AddEmployee = lazy(() => import("./pages/AddEmployee"));
const OfficeSettings = lazy(() => import("./pages/OfficeSettings"));
const Late = lazy(() => import("./pages/Late"));

function App() {

  return (

    <BrowserRouter>

      <Suspense
        fallback={
          <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-700">
            Loading...
          </div>
        }
      >

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

      </Suspense>

    </BrowserRouter>

  );

}

export default App;
