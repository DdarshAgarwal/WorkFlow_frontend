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

  const closeMobile = () =>
    setCollapsed && setCollapsed(false);

  const menuClass = `
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

  const employeeItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      Icon: LayoutDashboard,
    },
    {
      to: "/leave",
      label: "Leave",
      Icon: Calendar,
    },
    {
      to: "/late",
      label: "Late History",
      Icon: Clock3,
    },
  ];

  const adminItems = [
    {
      to: "/admin",
      label: "Admin",
      Icon: Shield,
    },
    {
      to: "/employees",
      label: "Employees",
      Icon: Users,
    },
    {
      to: "/add-employee",
      label: "Add Employee",
      Icon: UserPlus,
    },
    {
      to: "/office",
      label: "Office Settings",
      Icon: Building2,
    },
  ];

  const renderItem = ({ to, label, Icon }, showLabel = true) => (
    <Link
      key={to}
      to={to}
      className={menuClass}
      onClick={closeMobile}
      title={!showLabel ? label : undefined}
    >
      <Icon size={20} />
      {showLabel && label}
    </Link>
  );

  const renderMenu = (showLabel = true) => (
    <>
      {employeeItems.map((item) => renderItem(item, showLabel))}
      {role === "admin" &&
        adminItems.map((item) => renderItem(item, showLabel))}
    </>
  );

  const mobileContent = (
    <>
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="WORKFLOW" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">WORKFLOW</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Streamline Attendance. Empower Productivity.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 space-y-2">
        {renderMenu(true)}
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            logout();
            closeMobile();
          }}
          className={menuClass}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );

  const desktopContent = (
    <>
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
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

      <div className="flex-1 p-3 space-y-2">
        {renderMenu(!collapsed)}
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={logout}
          className={menuClass}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className={`md:hidden fixed inset-0 z-50 ${collapsed ? "block" : "hidden"}`}>
        <div
          className="fixed inset-0 bg-black/40"
          onClick={closeMobile}
        />
        <div className="relative w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col">
          {mobileContent}
        </div>
      </div>

      <div
        className={`
          hidden md:flex
          flex-col
          bg-white
          dark:bg-slate-900
          border-r
          border-slate-200
          dark:border-slate-800
          transition-all
          duration-300
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {desktopContent}
      </div>
    </>
  );

}

export default Sidebar;
