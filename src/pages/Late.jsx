import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function Late() {
  const [lateHistory, setLateHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLateHistory();
  }, []);

  const fetchLateHistory = async () => {
    try {
      const res = await api.get("/attendance/late-history");
      setLateHistory(res.data.lateHistory || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load late history.");
    } finally {
      setLoading(false);
    }
  };

  const totalLate = lateHistory.length;
  const deductedLeaves = Math.floor(totalLate / 3);
  const remainingLateMarks = 3 - (totalLate % 3 || 3);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Late History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            View all late arrivals and leave deductions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">Total Late Days</p>
            <h2 className="text-3xl font-bold mt-2">{totalLate}</h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">Leaves Deducted</p>
            <h2 className="text-3xl font-bold mt-2">{deductedLeaves}</h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">Late Marks Remaining</p>
            <h2 className="text-3xl font-bold mt-2">{remainingLateMarks}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-semibold">Late Attendance Records</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : lateHistory.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No late records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Clock In</th>
                    <th className="text-left p-4">Minutes Late</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lateHistory.map((item) => (
                    <tr key={item.id} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="p-4">
                        {new Date(item.lateDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {new Date(item.clockIn).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-4">{item.minutesLate} mins</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">
                          Late
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Late;
