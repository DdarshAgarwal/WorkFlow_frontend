import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function Dashboard() {

  const navigate = useNavigate();

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

    const [isClockedIn, setIsClockedIn] =
  useState(false);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {

  await Promise.all([
    fetchAttendance(),
    fetchAttendanceStatus(),
  ]);

};
 const fetchAttendanceStatus = async () => {

  try {

    const res =
      await api.get("/attendance/status");

    setIsClockedIn(
      !!res.data.clockedIn
    );

  } catch (error) {

    console.log(error);

  }

};
  const fetchAttendance =
    async () => {

      try {

        const res =
          await api.get(
            "/attendance/history"
          );

        setHistory(
          res.data.attendance || []
        );

        const attendance = res.data.attendance || [];
        if(attendance.length>0){
          const latest=attendance[0];
          setIsClockedIn(!!latest.clockIn && !latest.clockOut);
        } else {
          setIsClockedIn(false);
        }

      } catch (error) {

        console.log(error);

      }

    };

const clockIn = async () => {

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      try {

        setLoading(true);

        const res = await api.post(
          "/attendance/clock-in",
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        );

        setIsClockedIn(true);

        await loadDashboard();

        toast.success(
          res.data.message || "Clocked In Successfully"
        );

        if (res.data.isLate) {

          toast("You have been marked late.", {
            icon: "⚠️",
          });

        }

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Clock In Failed"
        );

      } finally {

        setLoading(false);

      }

    },

    () => {

      toast.error(
         "Please allow location access."
      );

    }

  );

};

const clockOut = async () => {

  try {

    setLoading(true);

    const res = await api.post(
      "/attendance/clock-out"
    );

    setIsClockedIn(false);

    await loadDashboard();

    toast.success(
      res.data.message || "Clocked Out Successfully"
    );

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Clock Out Failed"
    );

  } finally {

    setLoading(false);

  }

};

  const latest =
    history[0];

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1
            className="
            text-4xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >

            Welcome Back,
            {" "}
            {user?.firstName}

          </h1>

          <p
            className="
            text-slate-500
            dark:text-slate-400
            mt-2
            "
          >

            Monitor attendance,
            employee activity
            and leave requests.

          </p>

        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          <div
            className="
            bg-white
            dark:bg-slate-900

            rounded-2xl

            border
            border-slate-200
            dark:border-slate-800

            p-6
            shadow-sm
            "
          >

            <p className="text-slate-500 dark:text-slate-400">
              Attendance Records
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-3

              text-slate-900
              dark:text-white
              "
            >
              {history.length}
            </h2>

          </div>

          <div
            className="
            bg-white
            dark:bg-slate-900

            rounded-2xl

            border
            border-slate-200
            dark:border-slate-800

            p-6
            shadow-sm
            "
          >

            <p className="text-slate-500 dark:text-slate-400">
              Status
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              Present
            </h2>

          </div>

          <div
            className="
            bg-white
            dark:bg-slate-900

            rounded-2xl

            border
            border-slate-200
            dark:border-slate-800

            p-6
            shadow-sm
            "
          >

            <p className="text-slate-500 dark:text-slate-400">
              Employee ID
            </p>

            <h2
              className="
              text-3xl
              font-bold
              mt-3

              text-slate-900
              dark:text-white
              "
            >
              {user?.employeeId}
            </h2>

          </div>

          <div
            className="
            bg-white
            dark:bg-slate-900

            rounded-2xl

            border
            border-slate-200
            dark:border-slate-800

            p-6
            shadow-sm
            "
          >

            <p className="text-slate-500 dark:text-slate-400">
              Role
            </p>

            <h2 className="text-3xl font-bold mt-3 text-blue-600 capitalize">
              {user?.role}
            </h2>

          </div>

        </div>

        <div
          className="
          bg-white
          dark:bg-slate-900

          rounded-2xl

          border
          border-slate-200
          dark:border-slate-800

          p-8
          shadow-sm
          "
        >

          <h2
            className="
            text-xl
            font-bold

            text-slate-900
            dark:text-white

            mb-6
            "
          >
            Quick Actions
          </h2>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={clockIn}
              disabled={loading}
              className="w-40 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
            >
              Clock In
            </button>

            <button
              onClick={clockOut}
              disabled={loading}
              className="w-40 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
            >
              Clock Out
            </button>

            <button
              onClick={() =>
                navigate("/leave")
              }
              className="w-40 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
            >
              Apply Leave
            </button>

          </div>

        </div>

        <div
          className="
          bg-white
          dark:bg-slate-900

          rounded-2xl

          border
          border-slate-200
          dark:border-slate-800

          p-8
          shadow-sm
          "
        >

          <h2
            className="
            text-xl
            font-bold

            text-slate-900
            dark:text-white

            mb-6
            "
          >
            Latest Attendance
          </h2>

          {latest ? (

            <div className="grid md:grid-cols-4 gap-6">

              <div>
                <p className="text-slate-500 dark:text-slate-400">
                  Date
                </p>

                <h3 className="font-semibold mt-2 dark:text-white">
                  {new Date(
                    latest.date
                  ).toLocaleDateString()}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 dark:text-slate-400">
                  Clock In
                </p>

                <h3 className="font-semibold mt-2 dark:text-white">
                  {latest.clockIn
                    ? new Date(
                        latest.clockIn
                      ).toLocaleTimeString()
                    : "-"}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 dark:text-slate-400">
                  Clock Out
                </p>

                <h3 className="font-semibold mt-2 dark:text-white">
                  {latest.clockOut
                    ? new Date(
                        latest.clockOut
                      ).toLocaleTimeString()
                    : "-"}
                </h3>
              </div>

              <div>

                <p className="text-slate-500 dark:text-slate-400">
                  Status
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                  {latest.status}

                </span>

              </div>

            </div>

          ) : (

            <p className="text-slate-500 dark:text-slate-400">
              No records found.
            </p>

          )}

        </div>

      </div>

    </Layout>

  );

}

export default Dashboard;