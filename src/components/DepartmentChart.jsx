import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DepartmentChart({
  employees
}) {

  const counts = {};

  employees.forEach((emp) => {

    const dept =
      emp.department ||
      "Unassigned";

    counts[dept] =
      (counts[dept] || 0) + 1;

  });

  const labels =
    Object.keys(counts);

  const values =
    Object.values(counts);

  const colors = [

    "#2563EB", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#EC4899", // Pink
    "#84CC16", // Lime
    "#F97316", // Orange
    "#14B8A6", // Teal
    "#6366F1", // Indigo
    "#A855F7", // Violet

  ];

  const data = {

    labels,

    datasets: [

      {
        data: values,

        backgroundColor:
          labels.map(
            (_, index) =>
              colors[
                index %
                colors.length
              ]
          ),

        borderColor: "#ffffff",

        borderWidth: 3,
      },

    ],

  };

  const options = {

    responsive: true,

    plugins: {

      legend: {

        position: "bottom",

        labels: {

          padding: 20,

          font: {
            size: 13,
          },

        },

      },

      tooltip: {

        callbacks: {

          label: function(
            context
          ) {

            return `${context.label}: ${context.raw} Employees`;

          },

        },

      },

    },

  };

  return (

    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

      <h2 className="text-xl font-bold mb-6">

        Department Distribution

      </h2>

      <Pie
        data={data}
        options={options}
      />

    </div>

  );

}

export default DepartmentChart;