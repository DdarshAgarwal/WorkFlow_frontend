import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function LeaveAnalyticsChart({
  leaves
}) {

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

  const approved =
    leaves.filter(
      (l) =>
        l.status ===
        "Approved"
    ).length;

  const pending =
    leaves.filter(
      (l) =>
        l.status ===
        "Pending"
    ).length;

  const rejected =
    leaves.filter(
      (l) =>
        l.status ===
        "Rejected"
    ).length;

  const data = {

    labels: [

      "Approved",
      "Pending",
      "Rejected",

    ],

    datasets: [

      {
        data: [

          approved,
          pending,
          rejected,

        ],

        backgroundColor: [

          "#10B981",
          "#F59E0B",
          "#EF4444",

        ],

      },

    ],

  };

  const textColor = isDark ? "#E2E8F0" : "#000000";
  const options = {
    plugins: {
      legend: { labels: { color: textColor } },
      tooltip: { titleColor: textColor, bodyColor: textColor },
    },
  };

  return (

    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">

      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">

        Leave Status

      </h2>

      <div style={{ minHeight: 220 }}>
        <Doughnut data={data} options={options} />
      </div>

    </div>

  );

}

export default LeaveAnalyticsChart;