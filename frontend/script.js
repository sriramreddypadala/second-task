// script.js
document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("post-form");
    const postInput = document.getElementById("post-input");
    const postsContainer = document.getElementById("posts");

    postForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const postText = postInput.value.trim();

        if (postText) {
            addPost(postText);
            postInput.value = ""; // Clear input
        }
    });

    function addPost(text) {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        // Create post content
        const postContent = document.createElement("p");
        postContent.textContent = text;
        postDiv.appendChild(postContent);

        // Create like button
        const likeButton = document.createElement("button");
        likeButton.classList.add("like-button");
        likeButton.textContent = "Like (0)";
        let likeCount = 0;

        likeButton.addEventListener("click", function () {
            likeCount++;
            likeButton.textContent = `Like (${likeCount})`;
        });

        postDiv.appendChild(likeButton);

        // Create comment button
        const commentButton = document.createElement("button");
        commentButton.classList.add("comment-button");
        commentButton.textContent = "Comment";

        // Create comment section
        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");
        commentSection.style.display = "none"; // Start hidden

        const commentInput = document.createElement("textarea");
        commentInput.placeholder = "Add a comment...";
        commentSection.appendChild(commentInput);

        const submitCommentButton = document.createElement("button");
        submitCommentButton.textContent = "Submit Comment";
        submitCommentButton.addEventListener("click", function () {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
                commentDiv.textContent = commentText;
                commentSection.appendChild(commentDiv);
                commentInput.value = ""; // Clear input
            }
        });

        commentSection.appendChild(submitCommentButton);
        postDiv.appendChild(commentButton);
        postDiv.appendChild(commentSection);

        // Toggle comment section visibility
        commentButton.addEventListener("click", function () {
            commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
        });

        postsContainer.appendChild(postDiv);
    }
});
