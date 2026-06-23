import { useState } from "react";
import Icon from "./Icon";

export default function ActionBtn({ icon, onClick, title }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",   // 🔥 tighter layout
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,              // 🔥 REMOVE EXTRA SPACE
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon d={icon} />
      </button>

      {/* Tooltip */}
      {hover && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "110%",
            transform: "translateY(-50%)",
            background: "#111",
            color: "#fff",
            fontSize: 11,
            padding: "3px 6px",   // 🔥 smaller tooltip
            borderRadius: 5,
            whiteSpace: "nowrap",
            zIndex: 9999
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
}