import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "../../../styles/login.css";

const roles = [
  { value: "user", label: "User", icon: "👤", description: "Order milk" },
  { value: "admin", label: "Admin", icon: "🥛", description: "Manage milk supply" },
  {
    value: "deliveryboy",
    label: "Delivery Agent",
    icon: "🛵",
    description: "Deliver orders",
  },
];

export default function Login() {
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role ?? "user");
  const [email, setEmail] = useState(location.state?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { checkCredentials, signIn } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const account = checkCredentials({ email, password, role });
      signIn(account);
      navigate(`/${role}`, { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Could not sign in.");
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <img
          className="login-brand-icon"
          src="/images/logo.png"
          alt="Diary Farm logo"
        />

        <h1>Sign in to Diary Farm</h1>
        <p>Enter your account details to continue.</p>

        <p className="role-picker-label">Choose your account type</p>

        <div className="role-grid">
          {roles.map((option) => (
            <button
              className={`role-card ${role === option.value ? "selected" : ""}`}
              key={option.value}
              type="button"
              aria-pressed={role === option.value}
              onClick={() => setRole(option.value)}
            >
              <span className="role-card-icon" aria-hidden="true">
                {option.icon}
              </span>
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </button>
          ))}
        </div>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Sign in</button>

        <div className="social-auth-divider">
          <span>or sign in with</span>
        </div>

        <div className="social-auth-buttons">
          <button
            className="social-auth-button"
            type="button"
            onClick={() =>
              setError("Google sign-in needs Firebase authentication setup.")
            }
          >
            <strong className="google-mark">G</strong>
            Google
          </button>

          <button
            className="social-auth-button"
            type="button"
            onClick={() =>
              setError("Apple sign-in needs Firebase authentication setup.")
            }
          >
            <strong className="apple-mark">●</strong>
            Apple
          </button>
        </div>

        <p className="login-register">
          New to Diary Farm? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}