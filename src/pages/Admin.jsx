import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import DepartmentBarChart from "../components/DepartmentBarChart";
import LeaveAnalyticsChart from "../components/LeaveAnalyticsChart";
import AttendanceTrendChart from "../components/AttendanceTrendChart";

function Admin() {

  const [stats, setStats] =
    useState({
      totalEmployees: 0,
      totalAttendance: 0,
      pendingLeaves: 0,
    });

  const [leaves, setLeaves] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {

    fetchDashboard();
    fetchLeaves();
    fetchEmployees();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const res =
          await api.get(
            "/admin/dashboard"
          );

        setStats(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchLeaves =
    async () => {

      try {

        const res =
          await api.get(
            "/admin/leaves"
          );

        setLeaves(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchEmployees =
    async () => {

      try {

        const res =
          await api.get(
            "/admin/employees"
          );

        setEmployees(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const approveLeave =
    async (id) => {

      try {

        await api.put(
          `/admin/approve/${id}`
        );

        fetchLeaves();
        fetchDashboard();

      } catch (error) {

        console.log(error);

      }

    };

  const rejectLeave =
    async (id) => {

      try {

        await api.put(
          `/admin/reject/${id}`
        );

        fetchLeaves();
        fetchDashboard();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

            Admin Dashboard

          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            Organization overview,
            workforce analytics
            and leave management.

          </p>

        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <p className="text-slate-500 dark:text-slate-400">
              Total Employees
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">

              {stats.totalEmployees}

            </h2>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <p className="text-slate-500 dark:text-slate-400">
              Attendance Records
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">

              {stats.totalAttendance}

            </h2>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <p className="text-slate-500 dark:text-slate-400">
              Pending Leaves
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-3">

              {stats.pendingLeaves}

            </h2>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <p className="text-slate-500 dark:text-slate-400">
              Approval Rate
            </p>

            <h2 className="text-4xl font-bold text-purple-600 mt-3">

              94%

            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="grid lg:grid-cols-2 gap-6">

            <DepartmentBarChart
              employees={employees}
            />

            <LeaveAnalyticsChart
              leaves={leaves}
            />

          </div>

          <div className="mt-6">

            <AttendanceTrendChart />

          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">

              Leave Analytics

            </h2>

            <div className="space-y-5">

              <div className="flex justify-between items-center">

                <span className="text-slate-600 dark:text-slate-300">
                  Approved
                </span>

                <span className="font-bold text-green-600 text-xl">

                  {
                    leaves.filter(
                      (l) =>
                        l.status ===
                        "Approved"
                    ).length
                  }

                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-slate-600 dark:text-slate-300">
                  Pending
                </span>

                <span className="font-bold text-yellow-500 text-xl">

                  {
                    leaves.filter(
                      (l) =>
                        l.status ===
                        "Pending"
                    ).length
                  }

                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-slate-600 dark:text-slate-300">
                  Rejected
                </span>

                <span className="font-bold text-red-500 text-xl">

                  {
                    leaves.filter(
                      (l) =>
                        l.status ===
                        "Rejected"
                    ).length
                  }

                </span>

              </div>

            </div>

          </div>

        </div>

                {/* LEAVE QUEUE */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-slate-200 dark:border-slate-800">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              Leave Approval Queue

            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">

              Review employee leave requests.

            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50 dark:bg-slate-800">

                <tr>

                  <th className="text-left p-4 text-slate-900 dark:text-white">
                    Type
                  </th>

                  <th className="text-left p-4 text-slate-900 dark:text-white">
                    Start Date
                  </th>

                  <th className="text-left p-4 text-slate-900 dark:text-white">
                    End Date
                  </th>

                  <th className="text-left p-4 text-slate-900 dark:text-white">
                    Status
                  </th>

                  <th className="text-left p-4 text-slate-900 dark:text-white">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {leaves.map(
                  (leave) => (

                    <tr
                      key={leave.id}
                      className="
                      border-t
                      border-slate-200
                      dark:border-slate-800

                      hover:bg-slate-50
                      dark:hover:bg-slate-800
                      "
                    >

                      <td className="p-4 text-slate-900 dark:text-white">

                        {leave.leaveType}

                      </td>

                      <td className="p-4 text-slate-900 dark:text-white">

                        {new Date(
                          leave.startDate
                        ).toLocaleDateString()}

                      </td>

                      <td className="p-4 text-slate-900 dark:text-white">

                        {new Date(
                          leave.endDate
                        ).toLocaleDateString()}

                      </td>

                      <td className="p-4">

                        <span
                          className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          ${
                            leave.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : leave.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                          `}
                        >

                          {leave.status}

                        </span>

                      </td>

                      <td className="p-4">

                        {leave.status ===
                        "Pending" ? (

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                approveLeave(
                                  leave.id
                                )
                              }
                              className="
                              px-4
                              py-2
                              bg-green-600
                              hover:bg-green-700
                              text-white
                              rounded-lg
                              "
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                rejectLeave(
                                  leave.id
                                )
                              }
                              className="
                              px-4
                              py-2
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              rounded-lg
                              "
                            >
                              Reject
                            </button>

                          </div>

                        ) : (

                          <span className="text-slate-400 dark:text-slate-500">

                            Completed

                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* INSIGHTS */}

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">

            <h3 className="font-bold text-slate-900 dark:text-white">

              Workforce Health

            </h3>

            <p className="text-5xl font-bold text-green-600 mt-4">

              96%

            </p>

            <p className="text-slate-500 dark:text-slate-400 mt-2">

              Attendance compliance

            </p>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">

            <h3 className="font-bold text-slate-900 dark:text-white">

              Leave Trend

            </h3>

            <p className="text-5xl font-bold text-orange-500 mt-4">

              +12%

            </p>

            <p className="text-slate-500 dark:text-slate-400 mt-2">

              This month

            </p>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">

            <h3 className="font-bold text-slate-900 dark:text-white">

              HR Efficiency

            </h3>

            <p className="text-5xl font-bold text-blue-600 mt-4">

              A+

            </p>

            <p className="text-slate-500 dark:text-slate-400 mt-2">

              Approval performance

            </p>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default Admin;