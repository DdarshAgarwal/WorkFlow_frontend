import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || error.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 lg:bg-white">

      {/* LEFT - HIDDEN ON MOBILE */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900" />

        <div className="relative z-10 flex flex-col justify-center px-20">
          <div className="mb-12 flex items-center gap-4">
            <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <img src="/src/assets/logo.svg" alt="WORKFLOW" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white leading-tight">WORKFLOW</h1>
              <p className="text-slate-200 text-sm mt-1 max-w-lg">Streamline Attendance. Empower Productivity.</p>
            </div>
          </div>

          <div className="mt-12 flex gap-8">
            <div>
              <h3 className="text-4xl font-bold">99.9%</h3>
              <p className="text-slate-400">Uptime</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">100m</h3>
              <p className="text-slate-400">Geofence</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-slate-400">Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:bg-transparent lg:shadow-none lg:p-0">

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Welcome back to WORKFLOW</h2>
              <p className="text-slate-500">Sign in to manage attendance and teams.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
              </div>

              <button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition mt-6">
                Sign In
              </button>

            </form>

            <div className="space-y-4">
              <p className="text-center text-sm text-slate-600 mt-6 lg:mt-4">
                Don't have an account? <a href="/register" className="text-blue-600 font-semibold hover:text-blue-700">Sign up</a>
              </p>
              <p className="text-center text-sm text-slate-600">
                <a href="/forgot-password" className="text-blue-600 font-semibold hover:text-blue-700">Forgot password?</a>
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
