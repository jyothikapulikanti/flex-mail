import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  from: String,
  to: [String],
  subject: { type: String, default: "" },

  isEditedVersion: { type: Boolean, default: false },
originalEmailId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Email",
  default: null
},

  body: { type: String, default: "" },

  folder: {
    type: String,
    enum: ["inbox", "sent", "drafts", "spam", "trash", "promotions"],
    default: "inbox"
  },

  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },

  // 🔥 SIMPLE EDIT SUPPORT
  sentAt: Date,
  editedAt: Date

}, { timestamps: true });

export default mongoose.model("Email", emailSchema);