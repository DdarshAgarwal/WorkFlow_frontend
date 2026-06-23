import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function AddEmployee() {

  const [form, setForm] =
    useState({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      department: "",
    });

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/admin/employees",
          form
        );

        toast.success(
          "Employee Added Successfully"
        );

        setForm({
          employeeId: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          department: "",
        });

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed To Add Employee"
        );

      }

    };

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

            Add Employee

          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            Create a new employee account
            and onboard them into the system.

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm mx-4 sm:mx-6 md:mx-0 lg:mx-0">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  name="employeeId"
                  placeholder="Employee ID"
                  value={form.employeeId}
                  onChange={handleChange}
                  className="
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

                <input
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  className="
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

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="
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

                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="
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

              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
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

              <input
                type="password"
                name="password"
                placeholder="Temporary Password"
                value={form.password}
                onChange={handleChange}
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

              <button
                className="
                w-48
                h-12
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-xl
                font-semibold
                "
              >
                Create Employee
              </button>

            </form>

          </div>

          {/* PREVIEW */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm mx-4 sm:mx-6 md:mx-0 lg:mx-0">

            <h2 className="font-bold text-xl mb-6 text-slate-900 dark:text-white">

              Employee Preview

            </h2>

            <div className="flex flex-col items-center">

              <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">

                {form.firstName?.[0] || "E"}

              </div>

              <h3 className="text-xl font-bold mt-4 text-slate-900 dark:text-white">

                {form.firstName || "First"}{" "}
                {form.lastName || "Last"}

              </h3>

              <p className="text-slate-500 dark:text-slate-400">

                {form.email || "email@company.com"}

              </p>

              <span className="mt-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">

                Employee

              </span>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default AddEmployee;