import { useState } from "react";
import Icon from "../components/common/Icon";
import { ICONS } from "../utils/constants";

export default function LoginPage({ onLogin, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // ✅ REAL BACKEND CALL
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ pass user to App.jsx
      console.log("LOGIN RESPONSE:", data);
onLogin(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Space Grotesk', sans-serif"
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: "#0f0f18",
        border: "1px solid #1e1e2e",
        borderRadius: 20,
        padding: "40px"
      }}
    >
      <h2 style={{ color: "#fff", textAlign: "center" }}>
        flex<span style={{ color: "#6366f1" }}>mail</span>
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #2a2a3a",
            background: "#0a0a0f",
            color: "#fff"
          }}
        />

        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #2a2a3a",
            background: "#0a0a0f",
            color: "#fff"
          }}
        />

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#6366f1",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <button
        onClick={onGoToSignup}
        style={{
          marginTop: 10,
          background: "transparent",
          color: "#818cf8",
          border: "none",
          cursor: "pointer"
        }}
      >
        Create account
      </button>
    </div>
  </div>
);
}