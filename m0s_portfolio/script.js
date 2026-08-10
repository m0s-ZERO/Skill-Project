console.log("m0s portfolio");

const title = document.querySelector("#title");
const message = document.querySelector("#message");
const button = document.querySelector("#changeButton");

button.addEventListener("click", function(){
  title.textContent = "ZERO";
  message.textContent = "ボタンが押されました！";
  title.classList.toggle("active");
});

const nameInput = document.querySelector("#nameInput");
const showButton = document.querySelector("#showButton");
const nameMessage = document.querySelector("#nameMessage");
showButton.addEventListener("click", function(){
  if(nameInput.value === ""){
    nameMessage.classList.toggle("red-active");
    nameMessage.textContent = "名前を入力してください"
  } else {
    nameMessage.classList.toggle("blue-active");
    nameMessage.textContent = "ありがとうございます！" + nameInput.value + "さん";
  }
});