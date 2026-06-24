import { useEffect, useState } from "react";
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

function AttendanceTrendChart() {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const getDark = () => {
      if (document.documentElement.classList.contains("dark")) return true;
      if (prefers) return prefers.matches;
      return false;
    };

    setIsDark(getDark());

    const mqHandler = (e) => {
      if (!document.documentElement.classList.contains("dark")) {
        setIsDark(e.matches);
      }
    };

    if (prefers) {
      if (prefers.addEventListener) prefers.addEventListener("change", mqHandler);
      else prefers.addListener(mqHandler);
    }

    const obs = new MutationObserver(() => setIsDark(getDark()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      if (prefers) {
        if (prefers.removeEventListener) prefers.removeEventListener("change", mqHandler);
        else prefers.removeListener(mqHandler);
      }
      obs.disconnect();
    };
  }, []);

  const data = {

    labels: [

      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",

    ],

    datasets: [

      {
        label:
          "Attendance",

        data: [

          92,
          95,
          96,
          93,
          97,
          98,

        ],

        borderColor:
          "#2563EB",

        tension: 0.4,
      },

    ],

  };

  const textColor = isDark ? "#E2E8F0" : "#000000";
  const gridColor = isDark ? "rgba(226,232,240,0.04)" : "rgba(0,0,0,0.06)";

  const options = {
    plugins: {
      legend: { labels: { color: textColor } },
      tooltip: { titleColor: textColor, bodyColor: textColor },
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } },
    },
  };

  return (

    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">

      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">

        Attendance Trend

      </h2>

      <div style={{ minHeight: 260 }}>
        <Line data={data} options={options} />
      </div>

    </div>

  );

}

export default AttendanceTrendChart;