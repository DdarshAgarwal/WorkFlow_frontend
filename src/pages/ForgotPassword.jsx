import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1: email, 2: security questions, 3: new password
  const [email, setEmail] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetSecurityQuestions = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/auth/security-questions?email=${email}`);
      setSecurityQuestions(res.data.questions);
      setStep(2);
      toast.success("Please answer your security questions");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load security questions");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySecurityQuestions = async (e) => {
    e.preventDefault();

    const answerArray = securityQuestions.map(q => answers[q.question] || "");

    if (answerArray.some(a => !a.trim())) {
      toast.error("Please answer all security questions");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/verify-security-questions", {
        email,
        answers: answerArray
      });
      setStep(3);
      toast.success("Security questions verified! Set your new password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Incorrect security question answers");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter both passwords");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", {
        email,
        newPassword
      });

      toast.success(res.data.message || "Password reset successfully");
      
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 lg:bg-white">

      {/* LEFT - HIDDEN ON MOBILE */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900" />

        <div className="relative z-10 flex flex-col justify-center px-20">
          <div className="mb-12 flex items-center gap-4">
            <div className="w-16 h-16">
              <img src="/src/assets/logo.svg" alt="WORKFLOW" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white leading-tight">WORKFLOW</h1>
              <p className="text-slate-200 text-sm mt-1 max-w-lg">Verify identity and reset password securely.</p>
            </div>
          </div>

          <div className="mt-12 flex gap-8">
            <div>
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="text-slate-400">Secure</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">3 steps</h3>
              <p className="text-slate-400">Process</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">Easy</h3>
              <p className="text-slate-400">Setup</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:bg-transparent lg:shadow-none lg:p-0">

            {/* STEP INDICATOR */}
            <div className="flex justify-between items-center mb-10">
              <div className={`text-center ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-300'}`}>1</div>
                <p className="text-xs text-slate-600">Email</p>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
              <div className={`text-center ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-300'}`}>2</div>
                <p className="text-xs text-slate-600">Questions</p>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
              <div className={`text-center ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-300'}`}>3</div>
                <p className="text-xs text-slate-600">Password</p>
              </div>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">
                {step === 1 ? "Reset Password" : step === 2 ? "Verify Identity" : "New Password"}
              </h2>
              <p className="text-slate-500">
                {step === 1 ? "Enter your email address" : step === 2 ? "Answer your security questions" : "Set your new password"}
              </p>
            </div>

            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <form onSubmit={handleGetSecurityQuestions} className="space-y-5">
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

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-50 mt-6"
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              </form>
            )}

            {/* STEP 2: SECURITY QUESTIONS */}
            {step === 2 && (
              <form onSubmit={handleVerifySecurityQuestions} className="space-y-5">
                <div className="space-y-4">
                  {securityQuestions.map((q, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {q.question}
                      </label>
                      <input
                        type="text"
                        value={answers[q.question] || ""}
                        onChange={(e) => setAnswers({...answers, [q.question]: e.target.value})}
                        placeholder="Your answer"
                        className="w-full h-10 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 h-10 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 h-10 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            )}

            <p className="text-center text-sm text-slate-600 mt-8">
              Remember your password? <a href="/" className="text-blue-600 font-semibold hover:text-blue-700">Back to Login</a>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}

export default ForgotPassword;
