
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
  formStatus.innerHTML = `
  <span class="form-status-icon" aria-hidden="true">✓</span>
  <span class="form-status-title">入力内容の確認が完了しました</span>
  <span class="form-status-message">
    お問い合わせ内容を確認しました。<br>
    現在、メール送信機能は準備中です。
  </span>
`;

  formStatus.classList.add("is-success");
  formStatus.setAttribute("role", "status");
  formStatus.setAttribute("aria-live", "polite");

  console.log({
    name,
    email,
    service,
    message,
  });
});
