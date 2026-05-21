import { useEffect } from "react";
import { UsersTable } from "../../components/UsersTable/UsersTable";
import { PaginationControl } from "../../components/PaginationControl/PaginationControl";
import { useUsersStore } from "../../store/usersStore";
import "./UsersPage.css";

export const UsersPage = () => {
  const { users, pagination, perPage, loading, error, fetchUsers, setPerPage } =
    useUsersStore();

  useEffect(() => {
    fetchUsers(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="users-page">
      <h2 className="users-page__title">Список пользователей</h2>
      {error && <div className="error-message">{error}</div>}
      <UsersTable users={users} loading={loading} />
      {users.length > 0 && (
        <PaginationControl
          pagination={pagination}
          perPage={perPage}
          onPageChange={fetchUsers}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};
