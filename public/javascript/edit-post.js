const editPostHandler = async (id, title, post_content) => {
  if (title && post_content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
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
    alert("Enter both a title and post content.");
  }
};

const deletePostHandler = async (e) => {
  e.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

const editPostFormEl = document.getElementById("edit-post-form");
const deletePostButtonEl = document.getElementById("delete-post-button");

editPostFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const newPostTitle = document.getElementById("edit-post-title").value.trim();
  const newPostContent = document
    .getElementById("edit-post-content")
    .value.trim();
  editPostHandler(id, newPostTitle, newPostContent);
});

deletePostButtonEl.addEventListener("click", deletePostHandler);
