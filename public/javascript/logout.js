const logoutHandler = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

const logoutButtonEl = document.getElementById("logout-button");
logoutButtonEl.addEventListener("click", logoutHandler);

