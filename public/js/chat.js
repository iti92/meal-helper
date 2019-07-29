const socket = io.connect("185.188.182.48:3000");

// create round button
const chat = document.createElement("div");
const chatButton = document.createElement("span");
const chatButtoninner = document.createElement("a");

const styles = `
    background-image: url("img/chat.png");
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 80px;
    width: 80px;
    position: fixed;
    bottom: 10px;
    right: 10px ;
    border-radius: 50%;
    font-size: 1em;
    color: black;
    z-index: 999;
`;
const aStyle = `
    text-decoration: none;
    color: black;
`;
chat.style = styles;
document.body.appendChild(chat);
chat.appendChild(chatButton);
chatButton.appendChild(chatButtoninner);
chatButtoninner.style = aStyle;
chatButtoninner.href = "#";
chatButtoninner.innerText = "ok";
// end round button

//create chat-window
const chatMainWindow = document.createElement("div");

const styleChatMainWindow = `
    width: 450px;
    height: 480px;
    background-color: #f2f3f4;
    position: absolute;
    bottom: 0px;
    right: 30px;
    display: none;
    border: 1px black solid;
    z-index:998;
`;

chatMainWindow.style = styleChatMainWindow;
document.body.appendChild(chatMainWindow);
// end create chat-window

//create chatWindowtop
const chatName = document.createElement("div");
const styleChatName = `
    margin-top: 10px;
    border-bottom: #ecf0f1 1px solid;
    text-align: center;
    font-size:2em;
`;
chatMainWindow.appendChild(chatName);
chatName.style = styleChatName;
chatName.innerText = "online";
//end  create chatWindowtop

//create mainChatWindow
const mainChatWindow = document.createElement("div");
chatMainWindow.appendChild(mainChatWindow);

const styleMainChatWindow = `
    widht:400px;
    height:330px;
    background-color: #f4f6f6;
    margin:5px;
    border-radius: 5%;
    overflow: auto;
`;
mainChatWindow.style = styleMainChatWindow;
//end create mainChatWindow

//create input
const inputChat = document.createElement("input");
const styleInputChat = `
    width: 400px;
    border-radius:5%;
    margin-left:15px;
`;
const inputForm = document.createElement("form");
chatMainWindow.appendChild(inputForm);

inputChat.setAttribute("row", "2");
inputChat.classList.add("form-control");
inputChat.style = styleInputChat;
inputForm.appendChild(inputChat);
//End create input

const chatMessage = document.createElement("div");
const styleChatMessage = `
    font-size:2em;
    margin-left:15px;

`;
chatMessage.style = styleChatMessage;

//Open-close chat window
chatButtoninner.addEventListener("click", e => {
  e.preventDefault();
  if (chatMainWindow.style.display === "none") {
    chatMainWindow.style.display = "block";
    chatButtoninner.innerText = "ok";
  } else {
    chatMainWindow.style.display = "none";
    chatButtoninner.innerText = "ok";
  }
});

//Input lissnet
inputForm.addEventListener("submit", e => {
  e.preventDefault();
  const chatMessage = document.createElement("div");
  const styleChatMessage = `
    font-size:2em;
    margin-left:15px;
    `;
  socket.emit("send mess", {
    mess: inputChat.value
  });
  chatMessage.style = styleChatMessage;
  chatMessage.innerText = `you : ${inputChat.value}`;
  mainChatWindow.insertBefore(chatMessage, mainChatWindow.firstChild);
  inputChat.value = "";
});

socket.on("add mess", data => {
  const srvMessage = document.createElement("div");
  srvMessage.style = styleChatMessage;
  srvMessage.innerText = `server : ${data.mess}`;
  mainChatWindow.insertBefore(srvMessage, mainChatWindow.firstChild);
  if (
    chatButtoninner.innerText === "ok" &&
    chatMainWindow.style.display === "none"
  ) {
    chatButtoninner.innerText = "new";
  }
});
