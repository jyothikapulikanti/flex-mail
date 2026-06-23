import { useState, useEffect } from "react";
import { fmtCountdown } from "../utils/helpers";

export default function EditCountdownBadge({ email, onClick }) {
  // ⏱ Calculate seconds from backend field
  // 🔥 HARD STOP — do not show timer for edited mails
if (!email.sentAt || email.editedAt || email.isEditedVersion) {
  return null;
}

  const getSecs = () => {
  if (!email?.sentAt) return 0;

  const endTime =
    new Date(email.sentAt).getTime() + 5 * 60 * 1000;

  return Math.max(
    0,
    Math.floor((endTime - Date.now()) / 1000)
  );
};

  const [secs, setSecs] = useState(getSecs());

  useEffect(() => {
    const id = setInterval(() => {
      const left = getSecs();
      setSecs(left);
      if (left <= 0) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [email]);

 if (secs <= 0) {
  return (
    <button
      style={{
        background: "#444",
        color: "#fff",
        border: "none",
        padding: "6px 12px",
        borderRadius: 6
      }}
    >
      Edit Closed
    </button>
  );
}

  // ⏳ total edit window (temporary until backend sends it)
  const TOTAL_SECONDS = 300;

  const pct = secs / TOTAL_SECONDS;
  const urgent = secs < 60;

  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: urgent
          ? "rgba(239,68,68,0.12)"
          : "rgba(99,102,241,0.12)",
        border: `1px solid ${
          urgent
            ? "rgba(239,68,68,0.35)"
            : "rgba(99,102,241,0.35)"
        }`,
        borderRadius: 8,
        padding: "5px 10px",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
    >
      {/* Arc timer */}
      <svg width={18} height={18} viewBox="0 0 18 18">
        <circle
          cx={9}
          cy={9}
          r={7}
          fill="none"
          stroke={urgent ? "#ef444440" : "#6366f140"}
          strokeWidth={2.5}
        />
        <circle
          cx={9}
          cy={9}
          r={7}
          fill="none"
          stroke={urgent ? "#ef4444" : "#6366f1"}
          strokeWidth={2.5}
          strokeDasharray={`${2 * Math.PI * 7}`}
          strokeDashoffset={`${2 * Math.PI * 7 * (1 - pct)}`}
          strokeLinecap="round"
          transform="rotate(-90 9 9)"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>

      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          color: urgent ? "#ef4444" : "#818cf8",
          letterSpacing: "0.02em",
        }}
      >
        Edit · {fmtCountdown(secs)}
      </span>
    </button>
  );
}