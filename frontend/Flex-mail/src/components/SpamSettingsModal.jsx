import { useState } from "react";
import Icon from "./common/Icon";
import { ICONS } from "../utils/constants";

export default function SpamSettingsModal({
  settings,
  onSave,
  onClose
}) {
  // ✅ Safe initial state
  const [cfg, setCfg] = useState(settings || {});

  const update = (folder, key, value) =>
    setCfg(prev => ({
      ...prev,
      [folder]: {
        ...prev?.[folder],
        [key]: value
      }
    }));

  const folders = [
    { id: "spam", label: "Spam", icon: "🛡️" },
    { id: "trash", label: "Trash", icon: "🗑️" },
    { id: "promotions", label: "Promotions", icon: "🏷️" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        backdropFilter: "blur(6px)"
      }}
    >
      <div
        style={{
          width: 520,
          background: "#0f0f18",
          borderRadius: 20,
          border: "1px solid #2a2a3e",
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #1a1a28",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: "#e0e0f0",
                fontSize: 18,
                fontWeight: 800
              }}
            >
              Auto-Delete Settings
            </h2>
          </div>

          <button onClick={onClose}>
            <Icon d={ICONS.close} size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 24 }}>
          {folders.map(f => {
            const enabled = cfg?.[f.id]?.enabled;
            const days = cfg?.[f.id]?.afterDays || 1;

            return (
              <div key={f.id} style={{ marginBottom: 16 }}>
                {/* Toggle */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <span>{f.label}</span>

                  <button
                    onClick={() =>
                      update(f.id, "enabled", !enabled)
                    }
                  >
                    {enabled ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Input */}
                {enabled && (
                  <div style={{ marginTop: 8 }}>
                    <input
                      type="number"
                      min={1}
                      max={365}
                      value={days}
                      onChange={e =>
                        update(
                          f.id,
                          "afterDays",
                          +e.target.value
                        )
                      }
                    />
                    <span> days</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                // ✅ send to App.jsx → backend
                onSave(cfg);
                onClose();
              }}
            >
              Save
            </button>

            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}