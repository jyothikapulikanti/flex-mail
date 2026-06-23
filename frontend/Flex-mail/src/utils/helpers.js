export const EDIT_WINDOW_SECONDS = 300;
export const timeAgo = (date) => {
  const mins = Math.floor((Date.now() - new Date(date)) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
};

export const initials = (email) =>
  (email?.split("@")[0]?.[0] || "?").toUpperCase();

const AVATAR_COLORS = [
  "#6366f1","#8b5cf6","#ec4899","#f59e0b",
  "#10b981","#3b82f6","#ef4444","#14b8a6"
];

export const avatarColor = (str) =>
  AVATAR_COLORS[
    Array.from(str || "").reduce(
      (h, c) => (h * 31 + c.charCodeAt(0)) % AVATAR_COLORS.length,
      0
    )
  ];

 export const editSecondsLeft = (email) => {
  if (!email?.sentAt || email.folder !== "sent") return 0;
  const elapsed = Math.floor((Date.now() - new Date(email.sentAt).getTime()) / 1000);
  return Math.max(0, EDIT_WINDOW_SECONDS - elapsed);
};

export const fmtCountdown = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};