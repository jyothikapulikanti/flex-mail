import { useState, useEffect } from "react";
import Icon from "./common/Icon";
import { ICONS, EDIT_WINDOW_SECONDS } from "../utils/constants";  // ← add EDIT_WINDOW_SECONDS
import { editSecondsLeft, fmtCountdown } from "../utils/helpers"; 
export default function ComposeModal({ onClose, onSend, replyTo, editEmail, editSentEmail }) {
  const isSentEdit = !!editSentEmail;
  const seed = editSentEmail || editEmail;

  const [to,       setTo]       = useState(replyTo?.from || seed?.to?.[0] || "");
  const [subject,  setSubject]  = useState(replyTo ? `Re: ${replyTo.subject}` : seed?.subject || "");
  const [body,     setBody]     = useState(replyTo ? `\n\n--- Original ---\nFrom: ${replyTo.from}\n${replyTo.body}` : seed?.body || "");
  const [minimized, setMinimized] = useState(false);
  const [secsLeft, setSecsLeft]  = useState(() => editSentEmail ? editSecondsLeft(editSentEmail) : Infinity);
  const [saved, setSaved]        = useState(false);

  // Countdown for sent-edit modal
  useEffect(() => {
    if (!isSentEdit) return;
    const id = setInterval(() => {
      const left = editSecondsLeft(editSentEmail);
      setSecsLeft(left);
      if (left <= 0) { clearInterval(id); onClose(); }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSend = (isDraft = false) => {
    if (!to && !isDraft) return;
    onSend({ to: [to], subject, body, isDraft, draftId: editEmail?._id   });
    if (!isDraft) { setSaved(true); setTimeout(onClose, 800); }
    else onClose();
  };

  const handleSaveSentEdit = () => {
    if (secsLeft <= 0) return;
    onSend({ to: [to], subject, body, isSentEdit: true, id: editSentEmail._id });
    setSaved(true);
    setTimeout(onClose, 800);
  };

  const urgent = isSentEdit && secsLeft < 60 && secsLeft > 0;
  const headerBg = urgent
    ? "linear-gradient(90deg, #ef4444, #f97316)"
    : "linear-gradient(90deg, #6366f1, #8b5cf6)";

  const modalTitle = isSentEdit ? "Edit Sent Email" : editEmail ? "Edit Draft" : replyTo ? "Reply" : "New Message";

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100, width: 540, background: "#13131e", borderRadius: 16, boxShadow: "0 24px 80px rgba(0,0,0,0.8)", border: `1px solid ${urgent ? "rgba(239,68,68,0.4)" : "#2a2a3e"}`, display: "flex", flexDirection: "column", animation: "slideUp 0.25s cubic-bezier(.4,0,.2,1)", transition: "border-color 0.4s" }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; }}
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>

      {/* Header */}
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: minimized ? "none" : "1px solid #1e1e2e", background: headerBg, borderRadius: minimized ? 16 : "16px 16px 0 0", cursor: "pointer", transition: "background 0.4s" }} onClick={() => setMinimized(!minimized)}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Space Grotesk', sans-serif" }}>{modalTitle}</span>
          {isSentEdit && secsLeft > 0 && (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.85)", background: "rgba(0,0,0,0.2)", borderRadius: 6, padding: "2px 8px" }}>
              {fmtCountdown(secsLeft)}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: minimized ? "+" : "−", action: (e) => { e.stopPropagation(); setMinimized(!minimized); } },
            { label: <Icon d={ICONS.close} size={12} />, action: (e) => { e.stopPropagation(); onClose(); } },
          ].map(({ label, action }, i) => (
            <button key={i} onClick={action} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 4, width: 20, height: 20, cursor: "pointer", color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Progress bar for sent-edit */}
      {isSentEdit && !minimized && secsLeft > 0 && (
        <div style={{ height: 3, background: "#1a1a28", flexShrink: 0 }}>
          <div style={{
            height: "100%",
            width: `${(secsLeft / EDIT_WINDOW_SECONDS) * 100}%`,
            background: urgent ? "linear-gradient(90deg,#ef4444,#f97316)" : "linear-gradient(90deg,#6366f1,#8b5cf6)",
            transition: "width 1s linear, background 0.4s",
          }} />
        </div>
      )}

      {!minimized && (
        <>
          {/* Sent-edit notice */}
          {isSentEdit && (
            <div style={{ margin: "10px 16px 0", padding: "10px 14px", background: urgent ? "rgba(239,68,68,0.08)" : "rgba(99,102,241,0.08)", border: `1px solid ${urgent ? "rgba(239,68,68,0.25)" : "rgba(99,102,241,0.2)"}`, borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon d={urgent ? ICONS.spam : ICONS.edit} size={14} color={urgent ? "#ef4444" : "#818cf8"} />
              <span style={{ color: urgent ? "#ef4444" : "#818cf8", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                {urgent ? `⚠️ Only ${secsLeft}s left to save your changes!` : `You can edit this email for the next ${fmtCountdown(secsLeft)}`}
              </span>
            </div>
          )}

          <div style={{ padding: "4px 0" }}>
            {[{ label: "To", value: to, setter: setTo, placeholder: "Recipients" }, { label: "Subject", value: subject, setter: setSubject, placeholder: "Subject" }].map(({ label, value, setter, placeholder }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #1a1a28", padding: "6px 16px", gap: 8 }}>
                <span style={{ color: "#4a4a6a", fontSize: 12, width: 52, fontFamily: "'DM Mono', monospace" }}>{label}</span>
                <input value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#e0e0f0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif" }} />
              </div>
            ))}
          </div>

          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your message..." style={{ flex: 1, minHeight: 200, background: "none", border: "none", outline: "none", resize: "none", color: "#c0c0d8", fontSize: 14, lineHeight: 1.7, padding: "14px 18px", fontFamily: "'Space Grotesk', sans-serif" }} />

          <div style={{ padding: "12px 18px", borderTop: "1px solid #1a1a28", display: "flex", alignItems: "center", gap: 8 }}>
            {saved ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#10b981", fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>
                <Icon d={ICONS.check} size={16} color="#10b981" /> Saved!
              </div>
            ) : isSentEdit ? (
              <>
                <button onClick={handleSaveSentEdit} disabled={secsLeft <= 0} style={{ background: urgent ? "linear-gradient(135deg,#ef4444,#f97316)" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "10px 24px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: secsLeft <= 0 ? "not-allowed" : "pointer", fontFamily: "'Space Grotesk', sans-serif", boxShadow: "0 4px 16px rgba(99,102,241,0.35)", opacity: secsLeft <= 0 ? 0.5 : 1, transition: "background 0.4s" }}>
                  Save Changes
                </button>
                <button onClick={onClose} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #2a2a3e", borderRadius: 10, padding: "10px 16px", color: "#6b6b8a", fontSize: 13, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>Discard</button>
              </>
            ) : (
              <>
                <button onClick={() => handleSend(false)} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "10px 24px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}>Send</button>
                <button onClick={() => handleSend(true)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #2a2a3e", borderRadius: 10, padding: "10px 16px", color: "#8888a8", fontSize: 13, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>Save Draft</button>
              </>
            )}
            <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", color: "#4a4a6a", cursor: "pointer" }}>
              <Icon d={ICONS.delete} size={16} color="#4a4a6a" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
