import { useState, useEffect } from "react";
import Avatar from "./common/Avatar";
import Icon from "./common/Icon";
import ActionBtn from "./common/ActionBtn";
import { timeAgo } from "../utils/helpers";
import { ICONS } from "../utils/constants";

export default function EmailRow({
  email,
  selected,
  onSelect,
  onDelete,
  onMove,
  onToggleStar
}) {
  const [hovered, setHovered] = useState(false);

  // Optional re-render for dynamic updates (can keep or remove later)
  const [, tick] = useState(0);
  useEffect(() => {
    if (!email?.canEdit) return;
    const id = setInterval(() => tick(n => n + 1), 5000);
    return () => clearInterval(id);
  }, [email]);

  // ✅ Backend-driven editable flag
  const editable = email?.canEdit;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid #13131e",
        background: selected
          ? "rgba(99,102,241,0.1)"
          : hovered
          ? "rgba(255,255,255,0.02)"
          : "transparent",
        cursor: "pointer",
        borderLeft: `3px solid ${selected ? "#6366f1" : "transparent"}`,
        transition: "all 0.12s",
        position: "relative"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ paddingTop: 4, flexShrink: 0 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: email.isRead ? "transparent" : "#6366f1"
            }}
          />
        </div>

        <Avatar email={email.from} size={34} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3
            }}
          >
            <span
              style={{
                color: email.isRead ? "#8888a8" : "#e0e0f0",
                fontWeight: email.isRead ? 500 : 700,
                fontSize: 13,
                fontFamily: "'Space Grotesk', sans-serif",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 160
              }}
            >
              {email.folder === "sent" || email.folder === "drafts"
                ? `To: ${email.to?.[0] || "—"}`
                : email.from?.split("@")[0]}
            </span>

            <span
              style={{
                color: "#4a4a6a",
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
                flexShrink: 0
              }}
            >
              {timeAgo(email.createdAt)}
            </span>
          </div>

          <div
            style={{
              color: email.isRead ? "#5a5a7a" : "#c0c0d8",
              fontWeight: email.isRead ? 400 : 600,
              fontSize: 13,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: 4
            }}
          >
            {email.folder === "drafts" && (
              <span style={{ color: "#f59e0b" }}>[Draft] </span>
            )}
            {email.subject || "(no subject)"}
          </div>

          <div
            style={{
              color: "#3e3e5e",
              fontSize: 12,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {email.body}
          </div>

          {/* ✅ Backend-driven editable indicator */}
          {editable && email.folder === "sent" && (
            <div
              style={{
                marginTop: 5,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#6366f1",
                  animation: "pulse 1.5s infinite"
                }}
              />
              <span
                style={{
                  color: "#6366f1",
                  fontSize: 10,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 600
                }}
              >
                Editable
              </span>
            </div>
          )}
        </div>

        <button
          onClick={e => {
            e.stopPropagation();
            onToggleStar();
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            flexShrink: 0
          }}
        >
          <Icon
            d={ICONS.star}
            size={14}
            fill={email.isStarred ? "#f59e0b" : "none"}
            color={email.isStarred ? "#f59e0b" : "#3a3a5a"}
          />
        </button>
      </div>

      {/* Actions */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            gap: 4,
            background: "#1a1a28",
            borderRadius: 8,
            padding: "4px 6px",
            border: "1px solid #2a2a40"
          }}
          onClick={e => e.stopPropagation()}
        >
          <ActionBtn icon={ICONS.delete} onClick={onDelete} 
          title="Delete"/>
          <ActionBtn
            icon={ICONS.spam}
            onClick={() => onMove(email._id, "spam")}
            title="Spam"
          />
          <ActionBtn
            icon={ICONS.trash}
            onClick={() => onMove(email._id, "trash")}
            title="Trash"
          />
        </div>
      )}

      {/* Auto delete */}
      {email.scheduledDeleteAt && (
        <div
          style={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}
        >
          <Icon d={ICONS.clock} size={10} color="#f59e0b" />
          <span
            style={{
              color: "#f59e0b",
              fontSize: 10,
              fontFamily: "'DM Mono', monospace"
            }}
          >
            Auto-delete{" "}
            {timeAgo(email.scheduledDeleteAt).replace(" ago", "")}
          </span>
        </div>
      )}
    </div>
  );
}