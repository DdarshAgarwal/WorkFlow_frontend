import { useState } from "react";

import {
  ChevronDown,
  User,
  LogOut,
  PanelLeft,
  Moon,
  Sun,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useTheme,
} from "../context/ThemeContext";

function Navbar({

  collapsed,
  setCollapsed,

}) {

  const navigate =
    useNavigate();

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const [open,
    setOpen] =
    useState(false);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const logout = () => {

    localStorage.clear();

    window.location.href =
      "/";

  };

  return (

    <div
      className="
      h-20
      bg-white
      dark:bg-slate-900

      border-b
      border-slate-200
      dark:border-slate-800

      flex
      items-center
      justify-between

      px-4
      lg:px-8
      "
    >

      {/* LEFT */}

      <div
        className="
        flex
        items-center
        gap-4
        "
      >

        <button
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
          className="
          p-2
          rounded-xl

          hover:bg-slate-100
          dark:hover:bg-slate-800

          transition
          "
        >

          <PanelLeft
            size={22}
            className="
            text-slate-700
            dark:text-white
            "
          />

        </button>

        <input
          placeholder="Search..."
          className="
          hidden
          md:block

          w-56
          lg:w-80

          bg-slate-100
          dark:bg-slate-800

          border
          border-slate-200
          dark:border-slate-700

          rounded-xl

          px-4
          py-3

          outline-none

          text-slate-900
          dark:text-white

          focus:ring-2
          focus:ring-blue-500
          "
        />

      </div>

      {/* RIGHT */}

      <div
        className="
        flex
        items-center
        gap-4
        "
      >

        {/* DARK MODE */}

        <button

          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }

          className="
          p-3

          rounded-xl

          border
          border-slate-200
          dark:border-slate-700

          hover:bg-slate-100
          dark:hover:bg-slate-800

          transition
          "

        >

          {darkMode ? (

            <Sun
              size={18}
              className="
              text-yellow-400
              "
            />

          ) : (

            <Moon
              size={18}
              className="
              text-slate-700
              "
            />

          )}

        </button>

        {/* USER */}

        <div className="relative">

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
            flex
            items-center
            gap-3
            "
          >

            <div
              className="
              w-12
              h-12

              rounded-full

              bg-blue-600

              text-white

              font-bold

              flex
              items-center
              justify-center
              "
            >

              {
                user?.firstName?.[0]
              }

            </div>

            <div
              className="
              hidden
              md:block
              text-left
              "
            >

              <p
                className="
                font-semibold

                text-slate-800
                dark:text-white
                "
              >

                {user?.firstName}

              </p>

              <p
                className="
                text-sm

                text-slate-500
                dark:text-slate-400
                "
              >

                {user?.role}

              </p>

            </div>

            <ChevronDown
              size={18}
              className="
              text-slate-600
              dark:text-slate-400
              "
            />

          </button>

          {open && (

            <div
              className="
              absolute
              right-0
              mt-3

              w-56

              bg-white
              dark:bg-slate-900

              border
              border-slate-200
              dark:border-slate-800

              rounded-2xl

              shadow-xl

              overflow-hidden

              z-50
              "
            >

              <button

                onClick={() => {

                  setOpen(false);

                  navigate(
                    "/profile"
                  );

                }}

                className="
                w-full

                flex
                items-center
                gap-3

                px-4
                py-4

                hover:bg-slate-50
                dark:hover:bg-slate-800

                text-slate-700
                dark:text-white
                "
              >

                <User size={18} />

                My Profile

              </button>

              <button

                onClick={logout}

                className="
                w-full

                flex
                items-center
                gap-3

                px-4
                py-4

                text-red-600

                hover:bg-red-50
                dark:hover:bg-red-900/20
                "
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Navbar;