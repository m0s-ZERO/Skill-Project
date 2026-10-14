
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = contactForm.querySelector(".contact-submit");

// フォーム送信処理
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // 連続送信を防止
  if (submitButton.disabled) {
    return;
  }

  // ブラウザ標準の入力チェック
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();

    formStatus.textContent =
      "入力内容に不備があります。各項目をご確認ください。";

    return;
  }

  // 入力内容を取得
  const formData = new FormData(contactForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const service = formData.get("service");
  const message = formData.get("message").trim();

  // 必須項目の追加チェック
  if (!name || !email || !service || !message) {
    formStatus.textContent =
      "必須項目をすべて入力してください。";

    return;
  }

  // メールアドレスの追加チェック
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formStatus.textContent =
      "メールアドレスの形式をご確認ください。";

    return;
  }

  // 送信処理は未実装
  submitButton.disabled = true;
  formStatus.textContent =
    "入力内容を確認しました。現在、メール送信機能は準備中です。";

  console.log({
    name,
    email,
    service,
    message,
  });
});
