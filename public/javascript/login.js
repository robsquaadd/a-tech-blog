const loginHandler = async (username, password) => {
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Incorrect username or password");
    }
  } else {
    alert("No username or password provided!");
  }
};

const loginFormEl = document.getElementById("login-form");
loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  loginHandler(username, password);
});
