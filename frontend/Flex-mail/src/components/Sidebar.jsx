import Icon from "./common/Icon";
import Avatar from "./common/Avatar";
import Badge from "./common/Badge";
import { ICONS, FOLDERS } from "../utils/constants";
export default function Sidebar({ activeFolder, onFolderChange, emailCounts, onCompose, collapsed, onToggle ,user}) {
  return (
    <aside style={{ width: collapsed ? 64 : 240, background: "#0f0f14", borderRight: "1px solid #1e1e2e", display: "flex", flexDirection: "column", transition: "width 0.25s cubic-bezier(.4,0,.2,1)", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ padding: collapsed ? "18px 0" : "18px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onToggle} style={{ background: "none", border: "none", cursor: "pointer", color: "#a0a0b8", padding: 4, borderRadius: 6, display: "flex", flexShrink: 0 }}>
          <Icon d={ICONS.menu} size={20} color="#a0a0b8" />
        </button>
        {!collapsed && <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", whiteSpace: "nowrap", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}>flex<span style={{ color: "#6366f1" }}>mail</span></span>}
      </div>

      <div style={{ padding: collapsed ? "0 10px 20px" : "0 16px 20px" }}>
        <button onClick={onCompose} style={{ width: "100%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 14, padding: collapsed ? 12 : "12px 20px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 8, fontFamily: "'Space Grotesk', sans-serif", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
          <Icon d={ICONS.compose} size={16} />
          {!collapsed && "Compose"}
        </button>
      </div>

      <nav style={{ flex: 1, padding: "0 8px", overflow: "hidden" }}>
        {FOLDERS.map(f => {
          const active = activeFolder === f.id;
          return (
            <button key={f.id} onClick={() => onFolderChange(f.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: collapsed ? 0 : 12, justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "10px 0" : "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? "rgba(99,102,241,0.15)" : "transparent", color: active ? "#818cf8" : "#6b6b8a", fontWeight: active ? 700 : 500, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 2, transition: "all 0.15s", position: "relative" }}>
              {active && <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, borderRadius: 99, background: "#6366f1" }} />}
              <Icon d={f.icon} size={18} color={active ? "#818cf8" : "#6b6b8a"} />
              {!collapsed && <><span style={{ flex: 1, textAlign: "left" }}>{f.label}</span><Badge count={emailCounts[f.id]} /></>}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 8px", borderTop: "1px solid #1e1e2e" }}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: collapsed ? 0 : 10,
      justifyContent: collapsed ? "center" : "flex-start",
      padding: collapsed ? "10px 0" : "10px 14px"
    }}
  >
    <Avatar email={user?.email} size={28} />

    {!collapsed && (
      <div>
        <div
          style={{
            color: "#e0e0f0",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          {user?.name || "User"}
        </div>

        <div style={{ color: "#6b6b8a", fontSize: 11 }}>
          {user?.email}
        </div>
      </div>
    )}
  </div>
</div>
    </aside>
  );
}
