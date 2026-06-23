import Icon from "./common/Icon";
import EmailRow from "./EmailRow";
import { ICONS } from "../utils/constants";
export default function EmailList({ emails, folder, selectedId, onSelect, onDelete, onMove, onToggleStar, searchQuery }) {
 const filtered = emails
  .filter(e => {
    // 🔥 sender → show all

    if (folder === "starred") return true;
    if (folder === "sent") return true;

    // 🔥 receiver → hide old versions
    return !e.isEditedVersion;
  })
  .filter(e =>
    !searchQuery ||
    [e.subject, e.from, e.body].some(f =>
      f?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const unreadCount = filtered.filter(e => !e.isRead).length;
  const folderLabels = { inbox: "Inbox", sent: "Sent", drafts: "Drafts", promotions: "Promotions", spam: "Spam", trash: "Trash" };

  return (
    <div style={{ width: 360, background: "#0d0d12", borderRight: "1px solid #1e1e2e", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid #1a1a28" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ color: "#e0e0f0", fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{folderLabels[folder] || folder}</h2>
          {unreadCount > 0 && <span style={{ color: "#6366f1", fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{unreadCount} unread</span>}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#4a4a6a" }}>
            <Icon d={ICONS.inbox} size={40} color="#2a2a3e" />
            <p style={{ marginTop: 12, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14 }}>No emails here</p>
          </div>
        ) : filtered.map(email => (
          <EmailRow key={email._id} email={email} selected={selectedId === email._id}
            onSelect={() => onSelect(email)} onDelete={() => onDelete(email._id)}
            onMove={onMove} onToggleStar={() => onToggleStar(email._id)} />
        ))}
      </div>
    </div>
  );
}