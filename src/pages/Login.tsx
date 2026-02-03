import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const approved = new URLSearchParams(location.search).get("approved");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setError(null);

    if (!isGmail(email)) return setError("Email must be a valid @gmail.com address.");
    if (!isValidUSPhone(phone)) return setError("Enter a valid US phone number.");
    if (!password) return setError("Please enter your password.");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message || "Login failed");
        return;
      }

      localStorage.setItem("tg_token", data.token);
      navigate("/booking", { replace: true });
    } catch {
      setError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to order fuel deliveries.
        </p>

                {approved === "1" && (
          <div className="mt-4 rounded-lg bg-green-50 text-green-700 px-3 py-2 text-sm border border-green-200">
            Your account has been activated. You can login now.
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm border border-red-200">
            {error}
          </div>
        )}

        <div className="mt-5">
          <label className="text-sm font-medium">Gmail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@gmail.com"
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">US Mobile Number</label>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (415) 555-2671"
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="button"
          onClick={onLogin}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-orange-500 text-white py-2 font-semibold hover:bg-orange-600 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ Create account link */}
        <div className="mt-4 text-sm text-muted-foreground text-center">
          No account?{" "}
          <Link to="/signup" className="text-orange-600 font-semibold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ===== validators ===== */
const isGmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());

const isValidUSPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
};
