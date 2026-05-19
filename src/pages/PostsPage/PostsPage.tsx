import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsStore } from "../../store/postsStore";
import { useAuthStore } from "../../store/authStore";
import "./PostsPage.css";

export const PostsPage = () => {
  const navigate = useNavigate();
  const isValid = useAuthStore((state) => state.isValid());
  const { posts, pagination, perPage, loading, fetchPosts, setPerPage } =
    usePostsStore();

  useEffect(() => {
    if (!isValid) {
      navigate("/");
      return;
    }
    fetchPosts(1);
  }, [isValid]);

  if (!isValid) return null;

  const getPageNumbers = () => {
    const total = pagination.pages;
    const current = pagination.page;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);

      if (current > 3) pages.push("...");

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (current < total - 2) pages.push("...");

      pages.push(total);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="posts-page">
      <h2 className="posts-page__title">Список постов</h2>

      {loading ? (
        <div className="table-message">Загрузка...</div>
      ) : posts.length === 0 ? (
        <div className="table-message">Посты не найдены</div>
      ) : (
        <>
          <div className="posts-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Заголовок</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    <td className="post-id">#{post.id}</td>
                    <td>{post.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-wrapper">
            <div className="pagination-pages">
              <button
                className="pagination-btn"
                disabled={pagination.page === 1}
                onClick={() => fetchPosts(pagination.page - 1)}
              >
                ← Предыдущая
              </button>
              <div className="pagination-numbers">
                {pageNumbers.map((num, idx) =>
                  num === "..." ? (
                    <span key={`dots-${idx}`} className="page-dots">
                      …
                    </span>
                  ) : (
                    <button
                      key={num}
                      className={`page-num ${pagination.page === num ? "active" : ""}`}
                      onClick={() => fetchPosts(num as number)}
                    >
                      {num}
                    </button>
                  ),
                )}
              </div>
              <button
                className="pagination-btn"
                disabled={pagination.page === pagination.pages}
                onClick={() => fetchPosts(pagination.page + 1)}
              >
                Следующая →
              </button>
            </div>
            <div className="per-page-select">
              <label>Элементов на странице:</label>
              <div className="per-page-buttons">
                {[10, 25, 50].map((num) => (
                  <button
                    key={num}
                    className={`per-page-option ${perPage === num ? "active" : ""}`}
                    onClick={() => setPerPage(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
