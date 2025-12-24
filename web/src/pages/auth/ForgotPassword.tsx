import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/config";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(api.auth.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to process request");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mb-6 text-6xl">✉️</div>
            <h1 className="mb-4 text-3xl font-bold text-black">Check your email</h1>
            <p className="mb-8 text-gray-600">
              If an account exists with <strong>{email}</strong>, you will receive a password reset link.
            </p>
            <Link
              to="/auth/signin"
              className="inline-block w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-black">Forgot password?</h1>
            <p className="mt-2 text-gray-600">Enter your email and we'll send you a reset link</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Back to Sign In */}
          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/auth/signin" className="font-semibold text-black transition-colors hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
