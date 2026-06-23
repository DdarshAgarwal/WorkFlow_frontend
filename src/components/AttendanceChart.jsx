import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function AttendanceChart({ history }) {

  const labels =
    history
      .slice(0, 7)
      .reverse()
      .map(
        (item) =>
          new Date(
            item.date
          ).toLocaleDateString()
      );

  const hours =
    history
      .slice(0, 7)
      .reverse()
      .map(
        (item) =>
          Number(
            item.totalHours || 0
          )
      );

  const data = {

    labels,

    datasets: [

      {
        label: "Hours Worked",

        data: hours,

        tension: 0.4,
      },

    ],

  };

  return (

    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      <h2 className="text-xl font-bold mb-6">

        Weekly Attendance

      </h2>

      <Line data={data} />

    </div>

  );

}

export default AttendanceChart;