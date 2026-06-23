export const MOCK_EMAILS = {
  // ✅ COPY your FULL mock data here (no change)

  inbox: [
    { _id: "1", from: "alice@flexmail.io", subject: "Q3 Product Roadmap Review", body: "Hi, please review the attached Q3 roadmap before Friday's meeting. We need your sign-off on the new feature priorities.", isRead: false, isStarred: true, createdAt: new Date(Date.now() - 72e4), folder: "inbox", labels: ["Work"] },
    { _id: "2", from: "devteam@github.com", subject: "PR #482 ready for review", body: "Your pull request has been approved by 2 reviewers. Ready to merge into main.", isRead: false, isStarred: false, createdAt: new Date(Date.now() - 27e5), folder: "inbox", labels: ["Dev"] },
    { _id: "3", from: "noreply@notion.so", subject: "Weekly digest: 5 updates in your workspace", body: "Here's what happened in your Notion workspace this week.", isRead: true, isStarred: false, createdAt: new Date(Date.now() - 108e5), folder: "inbox", labels: [] },
    { _id: "4", from: "bob@flexmail.io", subject: "Lunch tomorrow?", body: "Hey! Want to grab lunch tomorrow around 1pm? That new place on 5th just opened.", isRead: true, isStarred: false, createdAt: new Date(Date.now() - 216e5), folder: "inbox", labels: [] },
    { _id: "5", from: "hr@company.io", subject: "Your leave request has been approved", body: "Your annual leave from Dec 23 – Jan 2 has been approved. Enjoy your holiday!", isRead: true, isStarred: true, createdAt: new Date(Date.now() - 864e5), folder: "inbox", labels: ["HR"] },
  ],
  promotions: [
    { _id: "6", from: "deals@amazon.com", subject: "🔥 Lightning Deals — Up to 70% OFF today only!", body: "Don't miss these incredible deals. Limited time offers available for Prime members.", isRead: false, isStarred: false, createdAt: new Date(Date.now() - 18e5), folder: "promotions", labels: [] },
    { _id: "7", from: "newsletter@medium.com", subject: "Your weekly reading list is ready", body: "Based on your interests, we've curated 8 must-read stories this week.", isRead: true, isStarred: false, createdAt: new Date(Date.now() - 18e6), folder: "promotions", labels: [] },
    { _id: "8", from: "offers@netflix.com", subject: "Special offer: 3 months free — act fast!", body: "We're giving away 3 months of Premium Netflix to select members.", isRead: false, isStarred: false, createdAt: new Date(Date.now() - 288e5), folder: "promotions", labels: [] },
  ],
  spam: [
    { _id: "9", from: "winner@prize-claim.xyz", subject: "🎉 CONGRATULATIONS! You have been selected", body: "You are our lucky winner! Click here to claim your $500 Amazon gift card.", isRead: false, isStarred: false, createdAt: new Date(Date.now() - 72e5), folder: "spam", scheduledDeleteAt: new Date(Date.now() + 6048e5), labels: [] },
    { _id: "10", from: "noreply@urgentverify.cc", subject: "URGENT: Verify your account immediately", body: "Your account has been flagged. Verify your identity within 48 hours.", isRead: false, isStarred: false, createdAt: new Date(Date.now() - 36e6), folder: "spam", scheduledDeleteAt: new Date(Date.now() + 6048e5), labels: [] },
  ],
  sent: [
    { _id: "11", from: "me@flexmail.io", to: ["alice@flexmail.io"], subject: "Re: Q3 Roadmap", body: "Thanks Alice, I'll review by EOD Thursday and share my notes.", isRead: true, isStarred: false, createdAt: new Date(Date.now() - 48e4), folder: "sent", labels: [] },
  ],
  drafts: [
    { _id: "12", from: "me@flexmail.io", subject: "Follow-up on design review", body: "Hey team, just wanted to circle back on...", isRead: true, isStarred: false, createdAt: new Date(Date.now() - 108e5), folder: "drafts", labels: [] },
  ],
  trash: [],
};


export const AUTO_DELETE_DEFAULTS = {
  spam:       { enabled: true,  afterDays: 30 },
  trash:      { enabled: true,  afterDays: 30 },
  promotions: { enabled: false, afterDays: 60 },
};