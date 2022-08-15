const signupHandler = async (username, password) => {
  if (username && password) {
    const response = await fetch("/api/users", {
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
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormEl = document.getElementById("signup-form");
signupFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value;
  signupHandler(username, password);
});
