
// constants.js
export const EDIT_WINDOW_SECONDS = 300; // 5 minutes
export const ICONS = {
  // ✅ COPY ALL ICONS OBJECT HERE (same as yours)

  compose:  "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  inbox:    ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  send:     "M22 2 11 13M22 2 15 22 11 13 2 9l20-7z",
  draft:    ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
  trash:    ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  spam:     ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
  promo:    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  search:   ["M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z","M21 21l-4.35-4.35"],
  close:    "M18 6 6 18M6 6l12 12",
  reply:    "M9 17 4 12l5-5M20 18v-2a4 4 0 0 0-4-4H4",
  forward:  "M15 17l5-5-5-5M4 18v-2a4 4 0 0 0 4-4h12",
  delete:   ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  menu:     "M3 12h18M3 6h18M3 18h18",
  clock:    ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
};


export const FOLDERS = [
  { id: "inbox", label: "Inbox", icon: ICONS.inbox },
  { id: "sent", label: "Sent", icon: ICONS.send },
   { id: "starred", label: "Starred", icon: ICONS.star }, 
  { id: "drafts", label: "Drafts", icon: ICONS.draft },
  { id: "promotions", label: "Promotions", icon: ICONS.promo },
  { id: "spam", label: "Spam", icon: ICONS.spam },
  { id: "trash", label: "Trash", icon: ICONS.trash },
];
