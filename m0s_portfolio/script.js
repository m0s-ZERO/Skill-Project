console.log("m0s portfolio");

const title = document.querySelector("#title");
const message = document.querySelector("#message");
const button = document.querySelector("#changeButton");

button.addEventListener("click", function(){
  title.textContent = "ZERO";
  message.textContent = "ボタンが押されました！";
  title.classList.toggle("active");
});