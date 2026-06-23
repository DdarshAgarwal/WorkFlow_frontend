import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function DepartmentBarChart({ employees }) {

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

  const counts = {};

  employees.forEach((emp) => {

    const dept =
      emp.department ||
      "Unassigned";

    counts[dept] =
      (counts[dept] || 0) + 1;

  });

  const data = {

    labels:
      Object.keys(counts),

    datasets: [

      {
        label:
          "Employees",

        data:
          Object.values(
            counts
          ),

        backgroundColor: [

          "#2563EB",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",

        ],

        borderRadius: 10,
      },

    ],

  };

  const textColor = isDark ? "#E2E8F0" : "#000000";
  const gridColor = isDark ? "rgba(226,232,240,0.04)" : "rgba(0,0,0,0.06)";

  const options = {
    plugins: {
      legend: {
        labels: { color: textColor },
      },
      tooltip: {
        titleColor: textColor,
        bodyColor: textColor,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
          callback: function(value) {
            const s = String(value);
            return s.length > 12 ? s.slice(0, 12) + '...' : s;
          }
        },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return (

    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">

      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">

        Employees by Department

      </h2>

      <div style={{ minHeight: 260 }}>
        <Bar data={data} options={options} />
      </div>

    </div>

  );

}

export default DepartmentBarChart;