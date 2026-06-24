import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const SECURITY_QUESTIONS = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "In what city were you born?",
  "What is your favorite book?",
  "What was your childhood nickname?",
  "What is the name of your best friend?",
  "What is your favorite color?",
  "In what year did you graduate?"
];

function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([
    { question: SECURITY_QUESTIONS[0], answer: "" },
    { question: SECURITY_QUESTIONS[1], answer: "" },
    { question: SECURITY_QUESTIONS[2], answer: "" }
  ]);

  const handleQuestionChange = (index, newQuestion) => {
    const updated = [...securityQuestions];
    updated[index] = { question: newQuestion, answer: updated[index].answer };
    setSecurityQuestions(updated);
  };

  const handleAnswerChange = (index, answer) => {
    const updated = [...securityQuestions];
    updated[index] = { question: updated[index].question, answer };
    setSecurityQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (securityQuestions.some(q => !q.answer.trim())) {
      toast.error("Please answer all security questions");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        firstName,
        lastName,
        company,
        email,
        department,
        password,
        securityQuestions
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Registration successful");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 lg:bg-white">

      {/* LEFT - HIDDEN ON MOBILE; fixed on desktop so it doesn't scroll */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-1/2 bg-slate-900 text-white lg:overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900" />

        <div className="relative z-10 flex flex-col justify-center px-20 h-full">
          <div className="mb-12 flex items-center gap-4">
            <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <img src={logo} alt="WORKFLOW" className="w-full h-full" />
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
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto lg:ml-[50%]">
        <div className="w-full max-w-md">
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:bg-transparent lg:shadow-none lg:p-0">

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-slate-900">Create your WORKFLOW account</h2>
              <p className="text-slate-500 mt-3">Secure your team's attendance and productivity.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company (optional)</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your Company"
                  className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                >
                  <option value="">Select department (optional)</option>
                  <option value="HR">HR</option>
                  <option value="SALES">SALES</option>
                  <option value="HEAD">HEAD</option>
                  <option value="COMMUNICATION">COMMUNICATION</option>
                  <option value="PR">PR</option>
                  <option value="FINANCE">FINANCE</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <div className="border-t border-slate-300 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Questions</h3>
                <p className="text-sm text-slate-600 mb-4">Answer 3 security questions for account recovery</p>

                <div className="space-y-4">
                  {securityQuestions.map((sq, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Question {index + 1}</label>
                      <select
                        value={sq.question}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        className="w-full h-10 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 mb-2"
                      >
                        {SECURITY_QUESTIONS.map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={sq.answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder="Your answer"
                        className="w-full h-10 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition mt-6">
                Create account
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account? <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700">Sign in</Link>
              </p>

            </form>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Register;
