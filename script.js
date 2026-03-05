/* ---------------- FIREBASE IMPORTS ---------------- */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
onSnapshot,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

/* ---------------- FIREBASE CONFIG ---------------- */

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_BUCKET",
messagingSenderId: "XXXX",
appId: "XXXX"
};

/* ---------------- INITIALIZE FIREBASE ---------------- */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/* ---------------- UI ELEMENTS ---------------- */

const emailContainer = document.querySelector(".emailList__list");

const composeBtn = document.querySelector(".sidebar__compose");
const composeBox = document.getElementById("composeBox");
const closeCompose = document.getElementById("closeCompose");

const attachBtn = document.getElementById("attachFile");
const fileInput = document.getElementById("attachment");
const fileName = document.getElementById("fileName");

/* ---------------- SIDEBAR ---------------- */

const inboxBtn = document.getElementById("inboxBtn");
const starredBtn = document.getElementById("starredBtn");
const snoozedBtn = document.getElementById("snoozedBtn");
const importantBtn = document.getElementById("importantBtn");
const sentBtn = document.getElementById("sentBtn");
const draftBtn = document.getElementById("draftBtn");

let currentPage = "inbox";

inboxBtn.onclick = () => {
currentPage = "inbox";
loadEmails();
};

starredBtn.onclick = () => {
currentPage = "starred";
loadEmails();
};

sentBtn.onclick = () => {
currentPage = "sent";
loadEmails();
};

draftBtn.onclick = () => {
currentPage = "draft";
loadEmails();
};

importantBtn.onclick = () => {
currentPage = "important";
loadEmails();
};

snoozedBtn.onclick = () => {
currentPage = "snoozed";
loadEmails();
};

/* ---------------- COMPOSE BOX ---------------- */

composeBtn.addEventListener("click", () => {
composeBox.style.display = "flex";
});

closeCompose.addEventListener("click", () => {
composeBox.style.display = "none";
});

/* ---------------- ATTACHMENT ---------------- */

attachBtn.addEventListener("click", () => {
fileInput.click();
});

fileInput.addEventListener("change", () => {

if(fileInput.files.length > 0){
fileName.innerText = fileInput.files[0].name;
}

});

/* ---------------- SEND MAIL ---------------- */

window.sendMail = async function(){

const receiver = document.getElementById("receiver").value;
const subject = document.getElementById("subject").value;
const message = document.getElementById("message").value;

const file = fileInput.files[0];

let fileURL = "";

try{

if(file){

const storageRef = ref(storage,"attachments/"+file.name);

await uploadBytes(storageRef,file);

fileURL = await getDownloadURL(storageRef);

}

await addDoc(collection(db,"mails"),{

sender:"[demo@flexmail.com](mailto:demo@flexmail.com)",
receiver,
subject,
message,
attachment:fileURL,
read:false,
starred:false,
important:false,
snoozed:false,
status:"sent",
timestamp:new Date()

});

alert("Mail Sent!");

document.getElementById("receiver").value="";
document.getElementById("subject").value="";
document.getElementById("message").value="";
fileInput.value="";
fileName.innerText="";

composeBox.style.display="none";

}
catch(error){

console.log(error);
alert("Error sending mail");

}

};

/* ---------------- EDIT MAIL ---------------- */

let editingMailId = null;

window.editMail = function(mailId, mail){

document.getElementById("receiver").value = mail.receiver;
document.getElementById("subject").value = mail.subject;
document.getElementById("message").value = mail.message;

editingMailId = mailId;

composeBox.style.display = "flex";

};

/* ---------------- UPDATE MAIL ---------------- */

window.updateMail = async function(){

const receiver = document.getElementById("receiver").value;
const subject = document.getElementById("subject").value;
const message = document.getElementById("message").value;

await updateDoc(doc(db,"mails",editingMailId),{

receiver,
subject,
message

});

alert("Mail Updated");

};

/* ---------------- READ ACKNOWLEDGEMENT ---------------- */

window.markAsRead = async function(mailId){

await updateDoc(doc(db,"mails",mailId),{
read:true
});

};

/* ---------------- LOAD EMAILS ---------------- */

function loadEmails(){

onSnapshot(collection(db,"mails"),(snapshot)=>{

emailContainer.innerHTML="";

let mailFound=false;

snapshot.forEach((docItem)=>{

const mail = docItem.data();

/* -------- FILTERING -------- */

if(currentPage==="sent" && mail.sender!=="[demo@flexmail.com](mailto:demo@flexmail.com)") return;

if(currentPage==="starred" && !mail.starred) return;

if(currentPage==="draft" && mail.status!=="draft") return;

if(currentPage==="important" && !mail.important) return;

if(currentPage==="snoozed" && !mail.snoozed) return;

mailFound=true;

/* -------- TIME -------- */

let time="";

if(mail.timestamp?.seconds){
time = new Date(mail.timestamp.seconds*1000).toLocaleTimeString();
}
else{
time = new Date(mail.timestamp).toLocaleTimeString();
}

/* -------- EMAIL ROW -------- */

emailContainer.innerHTML+=`

<div class="emailRow" onclick="markAsRead('${docItem.id}')">

<div class="emailRow__options">
<input type="checkbox">
<span class="material-icons">star_border</span>
<span class="material-icons">label_important</span>
</div>

<h3 class="emailRow__title">${mail.sender}</h3>

<div class="emailRow__message">

<h4>
${mail.subject}
<span class="emailRow__description">
- ${mail.message}
</span>
</h4>

${mail.attachment ? `<a href="${mail.attachment}" target="_blank">📎 Attachment</a>` : ""}

</div>

<p class="emailRow__time">
${mail.read ? "✓ Seen" : "✉ Delivered"}
</p>

<button onclick='event.stopPropagation(); editMail("${docItem.id}", ${JSON.stringify(mail)})'>
Edit
</button>

</div>

`;

});

/* -------- EMPTY MAILBOX -------- */

if(!mailFound){

emailContainer.innerHTML=`

<div class="noMail">
<span class="material-icons">mail</span>
<p>No messages yet</p>
</div>
`;

}

});

}

/* ---------------- PAGE LOAD ---------------- */

window.onload = () => {
loadEmails();
};
