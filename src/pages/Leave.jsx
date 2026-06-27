import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function Leave() {

  const [leaveType,
    setLeaveType] =
    useState("Casual Leave");

  const [startDate,
    setStartDate] =
    useState("");

  const [endDate,
    setEndDate] =
    useState("");

  const [reason,
    setReason] =
    useState("");

  const [leaves,
    setLeaves] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const fetchLeaves =
    async () => {

      try {

        const res =
          await api.get(
            "/leave/my-leaves"
          );

        setLeaves(
          res.data.leaves || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!startDate) {
        toast.error("Please select start date");
        return;
      }

      if (!endDate) {
        toast.error("Please select end date");
        return;
      }

      if (!reason.trim()) {
        toast.error("Please enter reason");
        return;
      }

      const todayDate = new Date();
      todayDate.setHours(0,0,0,0);
      const selectedStart = new Date(startDate);
      selectedStart.setHours(0,0,0,0);
      if (selectedStart < todayDate) {
        toast.error("Leave can only be applied for today or future dates.");
        return;
      }

      if (
        new Date(endDate) <
        new Date(startDate)
      ) {

        toast.error(
          "End date cannot be before start date"
        );

        return;
      }

      try {

        setLoading(true);

        await api.post(
          "/leave/apply",
          {
            leaveType,
            startDate,
            endDate,
            reason,
          }
        );

        toast.success(
          "Leave Applied Successfully"
        );

        setLeaveType(
          "Casual Leave"
        );

        setStartDate("");

        setEndDate("");

        setReason("");

        fetchLeaves();

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed To Apply Leave"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

            Leave Management

          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            Apply and track employee leave requests.

          </p>

        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm mx-4 sm:mx-6 md:mx-0">

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">

            Apply For Leave

          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <select
              value={leaveType}
              onChange={(e) =>
                setLeaveType(
                  e.target.value
                )
              }
              className="
              w-full
              h-12
              px-4
              border
              border-slate-300
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              rounded-xl
              "
            >

              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
              <option>Work From Home</option>

            </select>

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">

                  Start Date

                </label>

                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  h-12
                  px-4
                  border
                  border-slate-300
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  rounded-xl
                  "
                />

              </div>

              <div>

                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">

                  End Date

                </label>

                <input
                  type="date"
                  value={endDate}
                  min={startDate || today}
                  onChange={(e) =>
                    setEndDate(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  h-12
                  px-4
                  border
                  border-slate-300
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  rounded-xl
                  "
                />

              </div>

            </div>

            <textarea
              rows="4"
              placeholder="Reason for leave..."
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              className="
              w-full
              p-4
              border
              border-slate-300
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              rounded-xl
              resize-none
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
              transition
              "
            >

              {
                loading
                  ? "Applying..."
                  : "Apply Leave"
              }

            </button>

          </form>

        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mx-4 sm:mx-6 md:mx-0">

          <div className="p-6 border-b border-slate-200 dark:border-slate-800">

            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">

              My Leave Requests

            </h2>

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
                          font-medium
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

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default Leave;