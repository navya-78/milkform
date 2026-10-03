import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Register() {
  const { createAccount } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleRegister(event) {
    event.preventDefault();
    setError("");

    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const password = String(values.get("password") || "");
    const role = String(values.get("role") || "user");

    try {
      createAccount({ name, email, password, role });
      navigate("/login", { state: { email, role } });
    } catch (registrationError) {
      setError(registrationError.message || "Could not create the account.");
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleRegister}>
        <img
          className="login-brand-icon"
          src="/images/logo.png"
          alt="Diary Farm logo"
        />

        <h1>Create account</h1>
        <p>Register, then sign in with your account details.</p>

        <label htmlFor="register-name">Name</label>
        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength="6"
          required
        />

        <label htmlFor="register-role">Create account as</label>
        <select id="register-role" name="role" defaultValue="user">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="deliveryboy">Delivery Agent</option>
        </select>

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Create account</button>

        <div className="social-auth-divider">
          <span>or sign up with</span>
        </div>

        <div className="social-auth-buttons">
          <button
            className="social-auth-button"
            type="button"
            onClick={() =>
              setError("Google sign-up needs Google authentication setup.")
            }
          >
            <strong className="google-mark">G</strong>
            Google
          </button>

          <button
            className="social-auth-button"
            type="button"
            onClick={() =>
              setError("Apple sign-up needs Apple authentication setup.")
            }
          >
            <strong className="apple-mark">●</strong>
            Apple
          </button>
        </div>

        <p className="login-register">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
}