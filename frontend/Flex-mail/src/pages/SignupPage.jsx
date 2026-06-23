import { useState } from "react";
import Icon from "../components/common/Icon";
import { ICONS } from "../utils/constants";

export default function SignupPage({ onSignup, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strengthLevel =
    password.length === 0
      ? 0
      : password.length < 4
      ? 1
      : password.length < 6
      ? 2
      : password.length < 10
      ? 3
      : 4;

  const strengthColor = [
    "transparent",
    "#ef4444",
    "#f59e0b",
    "#6366f1",
    "#10b981"
  ][strengthLevel];

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthLevel];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Backend API call
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // ✅ Pass user data to parent (App.jsx)
      onSignup(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", width:"100%", background:"#0a0a0f", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Grotesk', sans-serif" }}>

      <div style={{ width:"100%", maxWidth:420, background:"#0f0f18", border:"1px solid #1e1e2e", borderRadius:20, padding:"40px" }}>

        <h2 style={{ color:"#fff", textAlign:"center" }}>
          flex<span style={{ color:"#6366f1" }}>mail</span>
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <input
            type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />

          {/* Strength */}
          {password && <div style={{ color: strengthColor }}>{strengthLabel}</div>}

          {/* Error */}
          {error && <div style={{ color: "red" }}>{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <button onClick={onGoToLogin}>
          Already have account? Login
        </button>
      </div>
    </div>
  );
}