import Icon from "./common/Icon";
import { ICONS } from "../utils/constants";
// ─── Search Bar ───────────────────────────────────────────────────────────────
export default function SearchBar({ value, onChange, onSettingsOpen }) {
  return (
    <div style={{ padding: "14px 20px", background: "#0d0d12", borderBottom: "1px solid #1a1a28", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "#13131e", border: "1px solid #2a2a3e", borderRadius: 12, padding: "8px 14px" }}>
        <Icon d={ICONS.search[0]} size={16} color="#4a4a6a" />
        <input value={value} onChange={e => onChange(e.target.value)} placeholder="Search emails..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#c0c0d8", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif" }} />
        {value && <button onClick={() => onChange("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#4a4a6a" }}><Icon d={ICONS.close} size={14} /></button>}
      </div>
      <button onClick={onSettingsOpen} style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#818cf8", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>
        <Icon d={ICONS.clock} size={14} color="#818cf8" />
        Auto-Delete
      </button>
    </div>
  );
}