import Icon from "./common/Icon";
import Avatar from "./common/Avatar";
import ActionBtn from "./common/ActionBtn";
import { ICONS } from "../utils/constants";
import { timeAgo } from "../utils/helpers";
import EditCountdownBadge from "./EditCountdownBadge";

export default function EmailView({
  email,
  onDelete,
  onMove,
  onReply,
  onEdit,
  onEditSent
}) {
  if (!email)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1f1f38"
        }}
      >
       <p> Select an email</p>
      </div>
    );

  // ✅ Backend-driven
  const canEdit =
  email.folder === "sent" &&
  email.sentAt &&
  !email.isEditedVersion && // 🔥 IMPORTANT
  !email.editedAt;
  const isSent = email.folder === "sent";

  return (
   <div style={{ flex: 1, background: "#0a0a0f", overflowY: "auto", padding: 20 }}>
      {/* Toolbar */}
      <div
        style={{
          padding: "16px 28px",
          borderBottom: "1px solid #1e1e2e",
          display: "flex",
          gap: 8
        }}
      >
        <ActionBtn
          icon={ICONS.delete}
          onClick={() => onDelete(email._id)}
        />
        <ActionBtn
          icon={ICONS.spam}
          onClick={() => onMove(email._id, "spam")}
        />
        <ActionBtn
          icon={ICONS.trash}
          onClick={() => onMove(email._id, "trash")}
        />

        {/* Draft edit */}
        {email.folder === "drafts" && (
          <button onClick={() => onEdit(email)}>Edit Draft</button>
        )}

        {/* Sent edit */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
  {canEdit ? (
    <EditCountdownBadge
      email={email}
      onClick={() => onEditSent(email)}
    />
  ) : (
    <span style={{ color: "#3a3a5a" }}>
      Edit closed
    </span>
  )}

  <ActionBtn
    icon={ICONS.reply}
    onClick={() => onReply(email)}
  />
</div>
      </div>

      {/* Content */}
      <div style={{ padding: 20 }}>
        <h2 style={{ color: "#ffffff" }}>{email.subject}</h2>
        {email.editedAt && !email.isEditedVersion && (
  <span style={{ color: "#22c55e", marginLeft: 8 }}>
    (Updated)
  </span>
)}
       {email.isEditedVersion && (
  <div style={{ color: "#ef4444", fontSize: 12 }}>
    You edited this mail
  </div>
)}
        <div style={{ display: "flex", gap: 10 }}>
  <Avatar email={email.from} />
  <div>
    <div style={{ color: "#e0e0f0", fontWeight: 600 }}>
      {email.from}
    </div>
    <div style={{ color: "#8888a8", fontSize: 12 }}>
      {timeAgo(email.createdAt)}
    </div>
  </div>
</div>

        <p style={{ color: "#d4d4f5", lineHeight: 1.6 }}>
  {email.body}
</p>

        {/* Edited label */}
        {email.editedAt && !email.isEditedVersion && (
  <span style={{ color: "#22c55e", marginLeft: 8 }}>
    Updated version
  </span>
)}
      </div>
    </div>
  );
}