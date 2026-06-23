import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import EmailList from "./components/EmailList";
import EmailView from "./components/EmailView";
import ComposeModal from "./components/ComposeModal";
import SpamSettingsModal from "./components/SpamSettingsModal";
import SearchBar from "./components/SearchBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {

  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  const [emails, setEmails] = useState({
    inbox: [],
    sent: [],
    drafts: [],
    spam: [],
    trash: [],
    promotions: []
  });

  const [folder, setFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composing, setComposing] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [editEmail, setEditEmail] = useState(null);
  const [editSentEmail, setEditSentEmail] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoDeleteSettings, setAutoDeleteSettings] = useState({});

  // ✅ LOAD USER FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ✅ FETCH EMAILS FUNCTION
  const fetchEmails = () => {
   fetch(`http://localhost:5000/api/emails?userId=${user._id}`)
      .then(res => res.json())
      .then(data => {
        console.log("EMAIL DATA:", data); // 🔥 DEBUG
        setEmails(data);
      })
      .catch(() => {
        setEmails({
          inbox: [],
          sent: [],
          drafts: [],
          spam: [],
          trash: [],
          promotions: []
        });
      });
  };

  // ✅ FETCH WHEN USER LOGS IN
  useEffect(() => {
    if (!user) return;
    fetchEmails();
  }, [user]);

  // ✅ EMAIL COUNTS
  const emailCounts = Object.fromEntries(
    Object.entries(emails || {}).map(([k, v]) => [
      k,
      (v || []).filter(e => !e.isRead).length
    ])
  );

  // ✅ SELECT EMAIL
 const handleSelect = (email) => {
  console.log("Selected Email:", email); // debug
  setSelectedEmail(email);

  // mark as read (correct API)
  fetch(`http://localhost:5000/api/emails/${email._id}/read`, {
    method: "PUT"
  });
};

  // ✅ DELETE EMAIL
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/emails/${id}`, {
      method: "DELETE"
    });

    fetchEmails(); // 🔥 refresh
    if (selectedEmail?._id === id) setSelectedEmail(null);
  };

  // ✅ MOVE EMAIL
  const handleMove = async (id, folder) => {
    await fetch(`http://localhost:5000/api/emails/${id}/move`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder })
    });

    fetchEmails(); // 🔥 refresh
  };

  // ✅ STAR EMAIL
  const handleToggleStar = async (id) => {
    await fetch(`http://localhost:5000/api/emails/${id}/star`, {
      method: "PUT"
    });

    fetchEmails(); // 🔥 refresh
  };

  // ✅ SEND EMAIL
  const handleSend = async (data) => {

  // 🔥 IF EDITING SENT MAIL
  if (editSentEmail) {
    await fetch(`http://localhost:5000/api/emails/${editSentEmail._id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject: data.subject,
        body: data.body
      })
    });
  } 
  // 🔥 NORMAL SEND
  else {
    await fetch("http://localhost:5000/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...data,
        userId: user._id
      })
    });
  }

  fetchEmails(); // refresh
  setSelectedEmail(null);
  closeCompose();
};

  // ✅ EDIT SENT EMAIL
 const handleEditSent = (email) => {

  // 🔥 ONLY allow original mails (not edited ones)
  if (!email.sentAt || email.editedAt || email.isEditedVersion) {
    return; // block editing
  }

  setEditSentEmail(email);
  setComposing(true);
};

  // ✅ CLOSE COMPOSE
  const closeCompose = () => {
    setComposing(false);
    setReplyTo(null);
    setEditEmail(null);
    setEditSentEmail(null);
  };

  // ✅ AUTH PAGES
  if (!user) {
    return authMode === "login" ? (
      <LoginPage
        onLogin={(userData) => {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        }}
        onGoToSignup={() => setAuthMode("signup")}
      />
    ) : (
      <SignupPage
        onSignup={(userData) => {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        }}
        onGoToLogin={() => setAuthMode("login")}
      />
    );
  }

  // ✅ MAIN UI
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <Sidebar
        activeFolder={folder}
        onFolderChange={(f) => {
          setFolder(f);
          setSelectedEmail(null);
        }}
        emailCounts={emailCounts}
        onCompose={() => setComposing(true)}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(v => !v)}
        user={user}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        <SearchBar
          value={search}
          onChange={setSearch}
          onSettingsOpen={() => setShowSettings(true)}
        />

        <div style={{ flex: 1, display: "flex" }}>

          <EmailList
            emails={emails[folder] || []}
            folder={folder}
            selectedId={selectedEmail?._id}
            onSelect={handleSelect}
            onDelete={handleDelete}
            onMove={handleMove}
            onToggleStar={handleToggleStar}
            searchQuery={search}
          />

          <EmailView
            email={selectedEmail}
            onDelete={handleDelete}
            onMove={handleMove}
            onReply={(email) => {
              setReplyTo(email);
              setComposing(true);
            }}
            onEdit={(email) => {
              setEditEmail(email);
              setComposing(true);
            }}
            onEditSent={handleEditSent}
          />
        </div>
      </div>

      {composing && (
        <ComposeModal
          onClose={closeCompose}
          onSend={handleSend}
          replyTo={replyTo}
          editEmail={editEmail}
          editSentEmail={editSentEmail}
        />
      )}

      {showSettings && (
        <SpamSettingsModal
          settings={autoDeleteSettings}
          onSave={setAutoDeleteSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <button
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "10px 15px"
        }}
      >
        Logout
      </button>
    </div>
  );
}