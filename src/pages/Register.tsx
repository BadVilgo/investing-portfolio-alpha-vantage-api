import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Dashboard.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      navigate("/dashboard");
    } else {
      setMessage("Account created. Please check your email to confirm, then log in.");
    }
  };

  return (
    <div className="dashboard-background">
      <div className="container py-5">
        <h1 className="text-center h2">Create a New Account</h1>
        {error && (
          <p className="text-danger text-center" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="text-info text-center" role="status">
            {message}
          </p>
        )}
        <form onSubmit={handleRegister} className="app-card p-4 mx-auto mt-4" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password (minimum 6 characters)
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="new-password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
