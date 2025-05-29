///////////////////////////////////////////////////////////////V!2

import { useState } from "react";

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState("login");
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [email, setEmail] = useState("");

  const switchToSignup = () => {
    setActiveForm("signup");
    setShowVerificationMessage(false);
  };

  const switchToLogin = () => {
    setActiveForm("login");
    setShowVerificationMessage(false);
  };

  const switchToForgotPassword = () => {
    setActiveForm("forgot");
    setShowVerificationMessage(false);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call your backend API
    // For demo, we'll just show the verification message
    const formEmail = e.target.elements.email.value;
    setEmail(formEmail);
    setShowVerificationMessage(true);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-green-500 to-red-500 via-orange-500 flex items-center justify-center">
      {/* Login Form */}
      <p
        className={`self-start text-white text-center ${
          activeForm == "signup" ? "pt-5 mt-5" : "pt-20 mt-10"
        } transition-all duration-800 ease-in-out`}
      >
        <h1 className=" text-5xl font-extrabold">VOTIVE</h1>
        <span>The Number 1 Online and USSD Voting Tool</span>
      </p>

      <div
        className={`absolute w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          activeForm === "login"
            ? "translate-x-0 opacity-100 z-10"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-orange-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-orange-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <button
            onClick={switchToSignup}
            className="font-medium text-green-600 hover:text-green-500 focus:outline-none"
          >
            Create account
          </button>
          <button
            onClick={switchToForgotPassword}
            className="font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Signup Form */}
      <div
        className={`absolute w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          activeForm === "signup"
            ? "translate-x-0 opacity-100 z-10"
            : activeForm === "login"
            ? "translate-x-full opacity-0 pointer-events-none"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {showVerificationMessage ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-center mb-4">
              Verify Your Email
            </h2>
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-indigo-800">
                We've sent a verification link to{" "}
                <span className="font-semibold">{email}</span>.
              </p>
              <p className="mt-2 text-indigo-800">
                Please check your email and click the link to continue.
              </p>
            </div>
            <button
              onClick={switchToLogin}
              className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Create Account
            </h2>
            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-green-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-green-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-green-500"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-green-500"
                  placeholder="••••••••"
                  required
                  minLength="8"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Create Account
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={switchToLogin}
                className="font-medium text-green-700 hover:text-orange-800 focus:outline-none"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>

      {/* Forgot Password Form */}
      <div
        className={`absolute w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          activeForm === "forgot"
            ? "translate-x-0 opacity-100 z-10"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-orange-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-orange-500"
              placeholder="+1 (123) 456-7890"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Send Reset Link
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <button
            onClick={switchToLogin}
            className="font-medium text-green-600 hover:text-green-700 focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
