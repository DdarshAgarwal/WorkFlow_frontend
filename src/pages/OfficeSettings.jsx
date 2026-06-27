import {
  useEffect,
  useState
} from "react";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

const DEFAULT_OFFICE = {
  name: "",
  latitude: "",
  longitude: "",
  radius: 100,
  officeStartTime: "10:00",
  officeEndTime: "19:00",
  graceMinutes: 15,
  fullDayHours: 8,
  halfDayHours: 4,
  workingDays:
    "Monday,Tuesday,Wednesday,Thursday,Friday",
  timezone:
    "Asia/Kolkata",
};

const toTimeInputValue = (value, fallback) => {
  if (!value) return fallback;

  const normalized =
    String(value)
      .trim()
      .replace(/\s+/g, "")
      .toUpperCase();

  const meridiemMatch =
    normalized.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

  if (meridiemMatch) {
    let hours = Number(meridiemMatch[1]);
    const minutes = meridiemMatch[2];
    const meridiem = meridiemMatch[3];

    if (meridiem === "PM" && hours < 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }

  const timeMatch =
    normalized.match(/^(\d{1,2}):(\d{2})$/);

  if (!timeMatch) return fallback;

  return `${String(Number(timeMatch[1])).padStart(2, "0")}:${timeMatch[2]}`;
};

const normalizeOffice = (office = {}) => ({
  ...DEFAULT_OFFICE,
  ...office,
  officeStartTime: toTimeInputValue(
    office.officeStartTime,
    DEFAULT_OFFICE.officeStartTime
  ),
  officeEndTime: toTimeInputValue(
    office.officeEndTime,
    DEFAULT_OFFICE.officeEndTime
  ),
  graceMinutes:
    office.graceMinutes ?? DEFAULT_OFFICE.graceMinutes,
  fullDayHours:
    office.fullDayHours ?? DEFAULT_OFFICE.fullDayHours,
  halfDayHours:
    office.halfDayHours ?? DEFAULT_OFFICE.halfDayHours,
  workingDays:
    office.workingDays || DEFAULT_OFFICE.workingDays,
  timezone:
    office.timezone || DEFAULT_OFFICE.timezone,
});

function OfficeSettings() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(DEFAULT_OFFICE);

  useEffect(() => {

    fetchOffice();

  }, []);

  const fetchOffice = async () => {

    try {

      const res =
        await api.get("/admin/office");

      setForm(normalizeOffice(res.data.office));

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load office settings."
      );

    }

  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name.trim()) {

      return toast.error(
        "Office name is required."
      );

    }

    if (!form.latitude || !form.longitude) {

      return toast.error(
        "Latitude and Longitude are required."
      );

    }

    if (!form.radius) {

      return toast.error(
        "Radius is required."
      );

    }

    try {

      setLoading(true);

      const payload = normalizeOffice(form);

      await api.put(
        "/admin/office",
        payload
      );

      setForm(payload);

      toast.success(
        "Office settings updated successfully."
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update office."
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

            Office Settings

          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            Configure attendance rules and office policies.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-4"
          >

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Office Name"
              className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
              />

              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
              />

            </div>

            <input
              name="radius"
              value={form.radius}
              onChange={handleChange}
              placeholder="Geofence Radius (meters)"
              className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
            />

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                  Office Start

                </label>

                <input
                  type="time"
                  name="officeStartTime"
                  value={form.officeStartTime}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
                />

              </div>

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                  Office End

                </label>

                <input
                  type="time"
                  name="officeEndTime"
                  value={form.officeEndTime}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
                />

              </div>

            </div>
                        <div className="grid grid-cols-3 gap-4">

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">
                  Grace Minutes
                </label>

                <input
                  type="number"
                  name="graceMinutes"
                  value={form.graceMinutes}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
                />

              </div>

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">
                  Full Day Hours
                </label>

                <input
                  type="number"
                  step="0.5"
                  name="fullDayHours"
                  value={form.fullDayHours}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
                />

              </div>

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">
                  Half Day Hours
                </label>

                <input
                  type="number"
                  step="0.5"
                  name="halfDayHours"
                  value={form.halfDayHours}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">
                Working Days
              </label>

              <input
                name="workingDays"
                value={form.workingDays}
                onChange={handleChange}
                placeholder="Monday,Tuesday,Wednesday,Thursday,Friday"
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
              />

            </div>

            <div>

              <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">
                Timezone
              </label>

              <input
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                placeholder="Asia/Kolkata"
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
            >
              {loading ? "Saving..." : "Save Office Settings"}
            </button>

          </form>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Office Summary
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300">

              <div className="flex justify-between">
                <span>Office</span>
                <span className="font-semibold">{form.name}</span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span>
                  {form.latitude}, {form.longitude}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Radius</span>
                <span>{form.radius} m</span>
              </div>

              <div className="flex justify-between">
                <span>Office Hours</span>
                <span>
                  {form.officeStartTime} - {form.officeEndTime}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Grace Period</span>
                <span>{form.graceMinutes} mins</span>
              </div>

              <div className="flex justify-between">
                <span>Full Day</span>
                <span>{form.fullDayHours} hrs</span>
              </div>

              <div className="flex justify-between">
                <span>Half Day</span>
                <span>{form.halfDayHours} hrs</span>
              </div>

              <div className="flex justify-between">
                <span>Working Days</span>
                <span className="text-right max-w-[220px]">
                  {form.workingDays}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Timezone</span>
                <span>{form.timezone}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default OfficeSettings;
