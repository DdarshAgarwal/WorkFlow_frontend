import {
  useEffect,
  useState
} from "react";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function OfficeSettings() {

  const [form, setForm] =
    useState({
      name: "",
      latitude: "",
      longitude: "",
      radius: ""
    });

  useEffect(() => {
    fetchOffice();
  }, []);

  const fetchOffice =
    async () => {

      try {

        const res =
          await api.get(
            "/admin/office"
          );

        setForm(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.put(
          "/admin/office",
          form
        );

        toast.success(
          "Office Updated"
        );

      } catch {

        toast.error(
          "Update Failed"
        );

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

            Configure office geofence
            and attendance restrictions.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <form
            onSubmit={handleSubmit}
            className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-8
            shadow-sm
            space-y-4
            "
          >

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Office Name"
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
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="Latitude"
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
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="Longitude"
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
              name="radius"
              value={form.radius}
              onChange={handleChange}
              placeholder="Radius (Meters)"
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
              w-40
              h-12
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-xl
              font-semibold
              "
            >
              Save Office
            </button>

          </form>

          <div
            className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-8
            shadow-sm
            "
          >

            <h2 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">

              Office Summary

            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-slate-500 dark:text-slate-400">
                  Office Name
                </p>

                <p className="font-semibold text-slate-900 dark:text-white">
                  {form.name}
                </p>

              </div>

              <div>

                <p className="text-slate-500 dark:text-slate-400">
                  Latitude
                </p>

                <p className="font-semibold text-slate-900 dark:text-white">
                  {form.latitude}
                </p>

              </div>

              <div>

                <p className="text-slate-500 dark:text-slate-400">
                  Longitude
                </p>

                <p className="font-semibold text-slate-900 dark:text-white">
                  {form.longitude}
                </p>

              </div>

              <div>

                <p className="text-slate-500 dark:text-slate-400">
                   Radius
                </p>

                <p className="font-semibold text-slate-900 dark:text-white">
                  {form.radius} meters
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default OfficeSettings;