const commentHandler = async (commentText, postId) => {
  if (commentText) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text: commentText,
        post_id: postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } else {
    alert("You submitted an empty comment");
  }
};

const commentButtonEl = document.getElementById("comment-button");
commentButtonEl.addEventListener("click", (e) => {
  e.preventDefault();
  const commentText = document.getElementById("comment-text").value.trim();
  const postId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  commentHandler(commentText, postId);
});
