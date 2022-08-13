const createPostHandler = async (title, post_content) => {
  if (title && post_content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        post_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please enter both a title and post content.");
  }
};

const createPostFormEl = document.getElementById("create-post-form");
createPostFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value.trim();
  const postContent = document.getElementById("post-content").value.trim();
  createPostHandler(title, postContent);
});
