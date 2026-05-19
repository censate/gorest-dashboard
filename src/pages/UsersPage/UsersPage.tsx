import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersStore } from "../../store/usersStore";
import { useAuthStore } from "../../store/authStore";
import "./UsersPage.css";

export const UsersPage = () => {
  const navigate = useNavigate();
  const isValid = useAuthStore((state) => state.isValid());
  const { users, pagination, perPage, loading, fetchUsers, setPerPage } =
    useUsersStore();

  useEffect(() => {
    if (!isValid) {
      navigate("/");
      return;
    }
    fetchUsers(1);
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
    <div className="users-page">
      <h2 className="users-page__title">Список пользователей</h2>

      {loading ? (
        <div className="table-message">Загрузка...</div>
      ) : users.length === 0 ? (
        <div className="table-message">Пользователи не найдены</div>
      ) : (
        <>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const [firstName, ...lastName] = user.name.split(" ");
                  return (
                    <tr
                      key={user.id}
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      <td>{firstName}</td>
                      <td>{lastName.join(" ") || "—"}</td>
                      <td>{user.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pagination-wrapper">
            <div className="pagination-pages">
              <button
                className="pagination-btn"
                disabled={pagination.page === 1}
                onClick={() => fetchUsers(pagination.page - 1)}
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
                      onClick={() => fetchUsers(num as number)}
                    >
                      {num}
                    </button>
                  ),
                )}
              </div>
              <button
                className="pagination-btn"
                disabled={pagination.page === pagination.pages}
                onClick={() => fetchUsers(pagination.page + 1)}
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
