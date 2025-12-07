import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/community.css";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState("");  
  const user = JSON.parse(localStorage.getItem("user"));

  // Load shared predictions
  useEffect(() => {
    API.get("/predictions/shared").then((res) => {
      setPosts(res.data.predictions);
    });
  }, []);

  // Add comment to a post
  const handleAddComment = async (postId) => {
    if (!commentInput.trim()) return alert("Comment cannot be empty");
    if (!user) return alert("Please sign in first");

    try {
      const res = await API.post(`/predictions/comment/${postId}`, {
        text: commentInput,
      });

      // Update UI instantly
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, comments: res.data.comments } : p
        )
      );

      setCommentInput("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <>
      <Navbar />

      <div className="community-page">
        <h1>Community Forum</h1>
        <p className="comm-sub">
          Browse predictions shared by the AgroVisionAI community.
        </p>

        <div className="post-list">
          {posts.map((p) => (
            <div key={p._id} className="post-card">

              {/* USER HEADER */}
              <div className="post-header">
                <div className="avatar-circle">
                  {p.userId?.name?.substring(0, 2).toUpperCase()}
                </div>

                <div>
                  <p className="post-user">{p.userId?.name}</p>
                  <p className="post-time">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <img src={p.imageUrl} alt="" className="post-image" />

              {/* META */}
              <div className="post-meta-row">
                <span className="confidence-badge">
                  {p.confidence}% confidence
                </span>
              </div>

              {/* BODY */}
              <div className="post-body">
                <p className="post-disease">{p.disease}</p>
                <p className="post-model">Model: {p.model}</p>
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                <h4 className="comment-title">Comments</h4>

                {/* Show existing comments */}
                <div className="comment-list">
                  {p.comments?.length > 0 ? (
                    p.comments.map((c, index) => (
                      <div key={index} className="comment-item">
                        <span className="comment-user">
                          {c.user?.name || "User"}:
                        </span>
                        <span className="comment-text">{c.text}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-comments">No comments yet</p>
                  )}
                </div>

                {/* Add new comment */}
                <div className="comment-input-row">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button onClick={() => handleAddComment(p._id)}>➤</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
