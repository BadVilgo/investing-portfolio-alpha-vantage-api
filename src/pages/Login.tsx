import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Dashboard.css";

function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test.com");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="dashboard-background">
      <div className="container py-5">
        <h1 className="text-center h2">Login to Your Account</h1>
        {error && (
          <p className="text-danger text-center" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} className="app-card p-4 mx-auto mt-4" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="email"
              placeholder="test@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-text">Use "test@test.com" for demo access.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="current-password"
              placeholder="test.com"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-text">Use "test.com" as the password.</div>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
