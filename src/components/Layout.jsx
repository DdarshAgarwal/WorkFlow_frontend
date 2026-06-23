import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

  const [collapsed,
    setCollapsed] =
    useState(false);

  return (

    <div
      className="
      flex
      h-screen

      bg-slate-50
      dark:bg-slate-950

      transition-colors
      duration-300

      overflow-hidden
      "
    >

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

      <div
        className="
        flex-1
        flex
        flex-col
        min-w-0
        "
      >

        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main
          className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          p-4 md:p-8

          text-slate-900
          dark:text-white

          transition-colors
          duration-300
          "
        >

          {children}

        </main>

      </div>

    </div>

  );

}

export default Layout;