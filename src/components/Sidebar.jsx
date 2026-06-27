import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock3,
  LogOut,
  UserPlus,
  Shield,
  Building2,
} from "lucide-react";

import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Sidebar({
  collapsed,
  setCollapsed,
}) {

  const role =
    localStorage.getItem(
      "role"
    );

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  const menuClass =
    `
    flex
    items-center
    gap-3

    px-4
    py-3

    rounded-xl

    text-slate-700
    dark:text-slate-300

    hover:bg-blue-50
    dark:hover:bg-slate-800

    hover:text-blue-600
    dark:hover:text-blue-400

    transition-all
    duration-200
    `;


  // Mobile content: always show full text for premium look
  const mobileContent = (
    <>
      {/* LOGO */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="WORKFLOW" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">WORKFLOW</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Streamline Attendance. Empower Productivity.</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 p-3 space-y-2">
        <Link to="/dashboard" className={menuClass} onClick={() => setCollapsed && setCollapsed(false)}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/leave" className={menuClass} onClick={() => setCollapsed && setCollapsed(false)}>
        <Link
  to="/late"
  className={menuClass}
  onClick={() => setCollapsed && setCollapsed(false)}
>
  <Clock3 size={20} />
  Late History
</Link>
          <Calendar size={20} />
          Leave
        </Link>
        {role === "admin" && (
          <>
            <Link to="/admin" className={menuClass} onClick={() => setCollapsed && setCollapsed(false)}>
              <Shield size={20} />
              Admin
            </Link>
            <Link to="/employees" className={menuClass} onClick={() => setCollapsed && setCollapsed(false)}>
              <Users size={20} />
              Employees
            </Link>
            <Link to="/add-employee" className={menuClass} onClick={() => setCollapsed && setCollapsed(false)}>
              <UserPlus size={20} />
              Add Employee
            </Link>
            <Link to="/office" className={menuClass} onClick={() => setCollapsed && setCollapsed(false)}>
              <Building2 size={20} />
              Office Settings
            </Link>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button onClick={() => { logout(); setCollapsed && setCollapsed(false); }} className={menuClass}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );

  // Desktop content: respects collapsed state
  const desktopContent = (
    <>
      {/* LOGO */}

      <div
        className="
        p-6

        border-b
        border-slate-200
        dark:border-slate-800

        flex
        items-center
        justify-center
        "
      >

        {collapsed ? (

          <div className="flex items-center justify-center p-2">
            <div className="w-14 h-14 rounded-lg overflow-hidden shadow-lg bg-white/5 dark:bg-slate-800 flex items-center justify-center ring-1 ring-white/10">
              <img src={logo} alt="WORKFLOW" className="w-12 h-12" />
            </div>
          </div>

        ) : (

          <div className="flex items-center gap-3">
            <img src={logo} alt="WORKFLOW" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">WORKFLOW</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Streamline Attendance</p>
            </div>
          </div>

        )}

      </div>

      {/* MENU */}

      <div
        className="
        flex-1
        p-3
        space-y-2
        "
      >

        <Link
          to="/dashboard"
          className={menuClass}
          onClick={() => setCollapsed && setCollapsed(false)}
        >

          <LayoutDashboard
            size={20}
          />

          {!collapsed &&
            "Dashboard"}

        </Link>

        <Link
          to="/leave"
          className={menuClass}
          onClick={() => setCollapsed && setCollapsed(false)}
        >
          <Link
  to="/late"
  className={menuClass}
  onClick={() => setCollapsed && setCollapsed(false)}
>
  <Clock3 size={20} />
  Late History
</Link>

          <Calendar
            size={20}
          />

          {!collapsed &&
            "Leave"}

        </Link>

        {role === "admin" && (
          <>

            <Link
              to="/admin"
              className={menuClass}
              onClick={() => setCollapsed && setCollapsed(false)}
            >

              <Shield
                size={20}
              />

              {!collapsed &&
                "Admin"}

            </Link>

            <Link
              to="/employees"
              className={menuClass}
              onClick={() => setCollapsed && setCollapsed(false)}
            >

              <Users
                size={20}
              />

              {!collapsed &&
                "Employees"}

            </Link>

            <Link
              to="/add-employee"
              className={menuClass}
              onClick={() => setCollapsed && setCollapsed(false)}
            >

              <UserPlus
                size={20}
              />

              {!collapsed &&
                "Add Employee"}

            </Link>

            <Link
              to="/office"
              className={menuClass}
              onClick={() => setCollapsed && setCollapsed(false)}
            >

              <Building2
                size={20}
              />

              {!collapsed &&
                "Office Settings"}

            </Link>

          </>
        )}

      </div>

      {/* FOOTER */}

      <div
        className="
        p-3

        border-t
        border-slate-200
        dark:border-slate-800
        "
      >

        <button
          onClick={() => { logout(); setCollapsed && setCollapsed(false); }}
          className={menuClass}
        >

          <LogOut
            size={20}
          />

          {!collapsed &&
            "Logout"}

        </button>

      </div>

    </>
  );

  return (

    <>
      {/* Mobile overlay (visible on small screens when collapsed is true) */}
      <div className={`md:hidden fixed inset-0 z-50 ${collapsed ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/40" onClick={() => setCollapsed && setCollapsed(false)} />
        <div className="relative w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col">
          {mobileContent}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={
        `
        hidden md:flex
        flex-col

        bg-white
        dark:bg-slate-900

        border-r
        border-slate-200
        dark:border-slate-800

        transition-all
        duration-300

        ${collapsed
          ? "w-20"
          : "w-64"
        }
        `}
      >
        {desktopContent}
      </div>
    </>
  );

}

export default Sidebar;