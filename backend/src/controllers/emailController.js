import Email from "../models/Email.js";
import User from "../models/User.js";

// 📥 GET EMAILS (grouped for frontend)
export const getEmails = async (req, res) => {
  try {
    const { userId } = req.query;

const emails = await Email.find({ owner: userId })
   // 🔥 newest first

    const grouped = {
      inbox: [],
      sent: [],
      drafts: [],
      spam: [],
      trash: [],
      promotions: [],
      starred:[]
    };

    emails.forEach(email => {
      if (!grouped[email.folder]) return;
      grouped[email.folder].push(email);

      if(email.isStarred)
      {
        grouped.starred.push(email);
      }
    });

     Object.keys(grouped).forEach(folder => {
      grouped[folder].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    });
    console.log("STARRED",grouped.starred)
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 📤 SEND EMAIL
export const sendEmail = async (req, res) => {
  try {
    const { to, subject, body, userId ,isDraft,draftId} = req.body;

    // 🔥 find sender
    const sender = await User.findById(userId);

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }
    if (isDraft) {
  const draft = await Email.create({
    owner: userId,
    from: sender.email,
    to: to || [],
    subject,
    body,
    folder: "drafts",
    isRead: true
  });

  return res.json(draft);
}

    // 🔥 support multiple emails
    const recipients = Array.isArray(to) ? to : [to];

    // 🔥 find valid users
    const users = await User.find({ email: { $in: recipients } });

    if (users.length === 0) {
      return res.status(404).json({ message: "No valid receivers found" });
    }
    //  PROMOTION and Spam DETECTION
const promoKeywords = ["sale", "offer", "discount", "deal", "coupon","bumper offer","exciting"];
const spamKeywords = ["win", "lottery", "prize", "free money","urgent","financial","Last Chance","Cash Bonus","Anti-Aging","double your cash","100% free","Miracle","Once in a life time"];
const text = (subject + " " + body).toLowerCase();

let folderType = "inbox";

// Spam first (higher priority)
if (spamKeywords.some(word => text.includes(word))) {
  folderType = "spam";
}
else if (
  promoKeywords.some(word => text.includes(word)) ||
  sender.email.includes("amazon") ||
  sender.email.includes("flipkart")||
  sender.email.includes("myntra")
) {
  folderType = "promotions";
}

// ✅ ADD THIS
const now = new Date();
    // ✅ sender copy
    const sentMail = await Email.create({
      owner: sender._id,
      from: sender.email,
      to: recipients,
      subject,
      body,
      folder: "sent",
      isRead: true,
      sentAt: now
    });
    // 🗑 delete draft after sending
if (draftId) {
  await Email.findByIdAndDelete(draftId);
}
    // ✅ receiver copies
    const inboxMails = users.map(user => ({
  owner: user._id,
  from: sender.email,
  to: recipients,
  subject,
  body,
  folder: folderType,
  isRead: false,
  originalEmailId: sentMail._id // 🔥 IMPORTANT
}));

    await Email.insertMany(inboxMails);

    res.json(sentMail);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};



// 🗑 DELETE EMAIL
export const deleteEmail = async (req, res) => {
  try {
    await Email.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 📁 MOVE EMAIL (spam / trash etc.)
export const moveEmail = async (req, res) => {
  try {
    const { folder } = req.body;

    await Email.findByIdAndUpdate(req.params.id, { folder });

    res.json({ message: "Moved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ⭐ TOGGLE STAR
export const toggleStar = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);

    email.isStarred = !email.isStarred;
    await email.save();

    res.json(email);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 📖 MARK AS READ
export const markRead = async (req, res) => {
  try {
    await Email.findByIdAndUpdate(req.params.id, {
      isRead: true
    });

    res.json({ message: "Read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✏️ EDIT EMAIL (within 5 min)
export const editEmail = async (req, res) => {
  try {
   let email = await Email.findById(req.params.id);

// 🔥 find root email (original sent mail)
const original = email.originalEmailId
  ? await Email.findById(email.originalEmailId)
  : email;

if (original.editedAt) {
  return res.status(400).json({ message: "Already edited once" });
}
    if (!original.sentAt) {
      return res.status(400).json({ message: "Cannot edit this email" });
    }

    const canEdit =
      Date.now() - new Date(original.sentAt).getTime() < 5 * 60 * 1000;

    if (!canEdit) {
      return res.status(400).json({ message: "Edit window closed" });
    }

    // 🔥 1. mark old sender email
    original.isEditedVersion = true;
    original.editedAt = new Date(); 
    await original.save();

    // 🔥 2. create NEW sender version
    const newSenderMail = await Email.create({
      owner: original.owner,
      from: original.from,
      to: original.to,
      subject: req.body.subject,
      body: req.body.body,
      folder: "sent",
      isRead: true,
      sentAt: null,
      editedAt: new Date(),
      originalEmailId: original._id
    });

    // 🔥 3. find ALL receiver emails
    const receiverMails = await Email.find({
  originalEmailId: original._id
});
    for (let mail of receiverMails) {
      // mark old version
      mail.isEditedVersion = true;
      mail.editedAt=new Date();
      await mail.save();

      // create updated version
      await Email.create({
        owner: mail.owner,
        from: original.from,
        to: original.to,
        subject: req.body.subject,
        body: req.body.body,
        folder: "inbox",
        isRead: false,
        editedAt: new Date(),
       originalEmailId: original._id
      });
    }

    res.json(newSenderMail);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};