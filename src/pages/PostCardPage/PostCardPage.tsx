import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post, Comment } from "../../types";
import { api } from "../../api";
import "./PostCardPage.css";

export const PostCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await api.getPost(Number(id));
        setPost(postData);
        setLoading(false);

        const commentsData = await api.getPostComments(Number(id));
        setComments(commentsData);
        setCommentsLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="table-message">Загрузка...</div>;
  }

  if (!post) {
    return <div className="table-message">Пост не найден</div>;
  }

  return (
    <div className="post-card">
      <button className="post-card__back" onClick={() => navigate("/posts")}>
        ← Назад к списку
      </button>
      <div className="post-card__content">
        <span className="post-card__id">#{post.id}</span>
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__body">{post.body}</p>
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Комментарии ({comments.length})</h3>
        {commentsLoading ? (
          <div className="table-message">Загрузка комментариев...</div>
        ) : comments.length === 0 ? (
          <div className="table-message">Комментарии не найдены</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-name">{comment.name}</span>
                <span className="comment-email">{comment.email}</span>
              </div>
              <p className="comment-body">{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
