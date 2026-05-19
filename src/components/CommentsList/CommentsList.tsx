import { useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import type { Comment } from "../../types";
import { api } from "../../api";
import "./CommentsList.css";

interface CommentsListProps {
  postId: number;
}

export const CommentsList = ({ postId }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await api.getPostComments(postId);
        setComments(data);
      } catch (err) {
        console.error("Ошибка загрузки комментариев:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <div className="table-message">Загрузка комментариев...</div>;
  }

  if (comments.length === 0) {
    return <div className="table-message">Комментарии не найдены</div>;
  }

  return (
    <div className="comments-list">
      <Text size="l" weight="bold" className="comments-list__title">
        Комментарии ({comments.length})
      </Text>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-item__header">
            <Text size="m" weight="bold">
              {comment.name}
            </Text>
            <Text size="s" view="secondary">
              {comment.email}
            </Text>
          </div>
          <Text size="m" className="comment-item__body">
            {comment.body}
          </Text>
        </div>
      ))}
    </div>
  );
};
