import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test.com");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="dashboard-background">
      <div className="container py-5">
        <h2 className="text-center">Login to Your Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={handleLogin}
          className="mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="test@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-text text-white">
              Use "test@test.com" for demo access.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="test.com"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-text text-white">
              Use "test.com" as the password.
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
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
