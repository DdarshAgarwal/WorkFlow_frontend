import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function Employees() {

  const [employees,
    setEmployees] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [departmentFilter,
    setDepartmentFilter] =
    useState("All");

  const [selectedEmployee,
    setSelectedEmployee] =
    useState(null);

  const [editEmployee, setEditEmployee] = useState(null);

  const [mobileSearch, setMobileSearch] = useState("");

  // Lightweight fuzzy match: substring OR subsequence (characters in order)
  const fuzzyIncludes = (text, q) => {
    if (!q) return true;
    if (!text) return false;
    const s = String(text).toLowerCase();
    const needle = q.toLowerCase().trim();
    if (!needle) return true;
    if (s.includes(needle)) return true;
    // subsequence check
    let i = 0;
    for (let ch of s) {
      if (ch === needle[i]) i++;
      if (i === needle.length) return true;
    }
    return false;
  };

  const [openMenuId, setOpenMenuId] = useState(null);

  const [editForm,
    setEditForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      role: "",
    });

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const openEditModal = (employee) => {
    setEditEmployee(employee);
    setEditForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department || "",
      role: employee.role,
    });
  };

  const saveEmployee = async () => {
    try {
      await api.put(`/admin/employees/${editEmployee.id}`, editForm);

      toast.success("Employee Updated");

      fetchEmployees();

      setEditEmployee(null);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const ok = window.confirm("Are you sure you want to remove this employee?");
      if (!ok) return;

      await api.delete(`/admin/employees/${id}`);

      setEmployees((prev) => prev.filter((e) => e.id !== id));

      toast.success("Employee removed");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleDeptChange = async (id, newDept) => {
    try {
      await api.put(`/admin/employees/${id}`, { department: newDept });

      setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, department: newDept } : e)));

      toast.success("Department updated");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const filteredEmployees =
    employees.filter((emp) => {

      const searchMatch =

        emp.firstName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        emp.lastName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        emp.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const departmentMatch =

        departmentFilter ===
          "All" ||

        emp.department ===
          departmentFilter;

      return (
        searchMatch &&
        departmentMatch
      );

    });

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

            Employee Directory

          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            View and manage all employees
            across your organization.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <p className="text-slate-500">
              Total Employees
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">

              {employees.length}

            </h2>

          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <p className="text-slate-500">
              Departments
            </p>

            <h2 className="text-4xl font-bold text-purple-600 mt-3">

              {
                [
                  ...new Set(
                    employees.map(
                      (e) =>
                        e.department
                    )
                  )
                ].filter(Boolean).length
              }

            </h2>

          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

            <p className="text-slate-500">
              Admin Users
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">

              {
                employees.filter(
                  (e) =>
                    e.role === "admin"
                ).length
              }

            </h2>

          </div>

        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mx-4 sm:mx-6 md:mx-0">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
              h-12
              px-4
              border
              border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white
              rounded-xl
              "
            />

            <select
              value={
                departmentFilter
              }
              onChange={(e) =>
                setDepartmentFilter(
                  e.target.value
                )
              }
              className="
              h-12
              px-4
              border
              border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white
              rounded-xl
              "
            >

              <option>
                All
              </option>

              {[
                ...new Set(
                  employees.map(
                    (emp) =>
                      emp.department
                  )
                ),
              ]
                .filter(Boolean)
                .map((dept) => (

                  <option
                    key={dept}
                  >
                    {dept}
                  </option>

                ))}

            </select>

          </div>

        </div>

        {/* Desktop: show full grid */}
        <div className="hidden md:grid lg:grid-cols-3 md:grid-cols-2 gap-6">

          {filteredEmployees.map(
            (employee) => (

              <div
                key={employee.id}
                className="
                relative
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-lg
                transition
                "
              >

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === employee.id ? null : employee.id);
                  }}
                  className="absolute right-4 top-4 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ⋯
                </button>

                {openMenuId === employee.id && (
                  <div className="absolute right-4 top-12 bg-white dark:bg-slate-900 border rounded-md shadow py-1 z-50">
                    <button
                      onClick={() => { openEditModal(employee); setOpenMenuId(null); }}
                      className="block w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => { handleDelete(employee.id); setOpenMenuId(null); }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">

                    {
                      employee
                      .firstName?.[0]
                    }

                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">

                      {employee.firstName} {employee.lastName}

                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-sm">

                      {employee.employeeId}

                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  <div>

                    <p className="text-xs uppercase text-slate-500 dark:text-slate-400">

                      Email

                    </p>

                    <p className="text-slate-900 dark:text-white">

                      {employee.email}

                    </p>

                  </div>

                  <div>

                    <p className="text-xs uppercase text-slate-500 dark:text-slate-400">

                      Department

                    </p>

                    <select
                      value={employee.department || ""}
                      onChange={(e) => handleDeptChange(employee.id, e.target.value)}
                      className="text-slate-900 dark:text-white p-2 border border-slate-200 rounded-md bg-white dark:bg-slate-900"
                    >
                      <option value="">Not Assigned</option>
                      <option value="HR">HR</option>
                      <option value="SALES">SALES</option>
                      <option value="HEAD">HEAD</option>
                      <option value="COMMUNICATION">COMMUNICATION</option>
                      <option value="PR">PR</option>
                      <option value="FINANCE">FINANCE</option>
                    </select>

                  </div>

                  <div>

                    <p className="text-xs uppercase text-slate-500 dark:text-slate-400">

                      Role

                    </p>

                    <span
                      className={`
                      inline-block
                      mt-1
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      ${
                        employee.role === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      }
                      `}
                    >
                      {employee.role}
                    </span>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        {/* Mobile: searchable dropdown + single-card view */}
        <div className="md:hidden">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-4 mx-4 sm:mx-6 md:mx-0">
            <input
              type="text"
              placeholder="Search employee"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
            />

            <div className="mt-2 max-h-48 overflow-y-auto">
              {(() => {
                const q = mobileSearch || "";
                const list = filteredEmployees.filter(emp => (
                  fuzzyIncludes(emp.firstName, q) ||
                  fuzzyIncludes(emp.lastName, q) ||
                  fuzzyIncludes(emp.email, q) ||
                  fuzzyIncludes(emp.employeeId, q)
                ));
                if (list.length === 0) {
                  return (
                    <div className="text-sm text-slate-500 dark:text-slate-400 p-3">No results found</div>
                  );
                }

                return list.slice(0, 50).map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => { setSelectedEmployee(emp); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{emp.firstName?.[0]}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{emp.firstName} {emp.lastName}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{emp.employeeId} • {emp.email}</div>
                    </div>
                  </button>
                ));
              })()}
            </div>

            <div className="mt-3">
              <button onClick={() => { setSelectedEmployee(null); setMobileSearch(""); }} className="w-full h-10 border border-slate-300 rounded-lg">Clear</button>
            </div>
          </div>

          {selectedEmployee && (
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition mx-4 sm:mx-6 md:mx-0">

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === selectedEmployee.id ? null : selectedEmployee.id);
                }}
                className="absolute right-4 top-4 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ⋯
              </button>

              {openMenuId === selectedEmployee.id && (
                <div className="absolute right-4 top-12 bg-white dark:bg-slate-900 border rounded-md shadow py-1 z-50">
                  <button
                    onClick={() => { openEditModal(selectedEmployee); setOpenMenuId(null); }}
                    className="block w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => { handleDelete(selectedEmployee.id); setOpenMenuId(null); setSelectedEmployee(null); }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">{selectedEmployee.firstName?.[0]}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedEmployee.employeeId}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-slate-900 dark:text-white">{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Department</p>
                  <select
                    value={selectedEmployee.department || ""}
                    onChange={(e) => handleDeptChange(selectedEmployee.id, e.target.value)}
                    className="text-slate-900 dark:text-white p-2 border border-slate-200 rounded-md bg-white dark:bg-slate-900"
                  >
                    <option value="">Not Assigned</option>
                    <option value="HR">HR</option>
                    <option value="SALES">SALES</option>
                    <option value="HEAD">HEAD</option>
                    <option value="COMMUNICATION">COMMUNICATION</option>
                    <option value="PR">PR</option>
                    <option value="FINANCE">FINANCE</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Role</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${selectedEmployee.role === "admin" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200" : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"}`}>
                    {selectedEmployee.role}
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

        {editEmployee && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-sm md:max-w-lg mx-4 md:mx-0">

              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">

                Edit Employee

              </h2>

              <div className="space-y-4">

                <input
                  value={editForm.firstName}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="First Name"
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
                />

                <input
                  value={editForm.lastName}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Last Name"
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
                />

                <input
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
                />

                <select
                  value={editForm.department}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      department: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Not Assigned</option>
                  <option value="HR">HR</option>
                  <option value="SALES">SALES</option>
                  <option value="HEAD">HEAD</option>
                  <option value="COMMUNICATION">COMMUNICATION</option>
                  <option value="PR">PR</option>
                  <option value="FINANCE">FINANCE</option>
                </select>

                <select
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      role: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
                >
                  <option value="employee">
                    Employee
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => setEditEmployee(null)}
                  className="px-5 py-3 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={saveEmployee}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </Layout>

  );

}

export default Employees;