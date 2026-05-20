import { useNavigate } from "react-router-dom";
import { Table, TableColumn } from "@consta/uikit/Table";
import type { User } from "../../types";
import "./UsersTable.css";

interface UsersTableProps {
  users: User[];
  loading: boolean;
}

type TableRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

const columns: TableColumn<TableRow>[] = [
  { title: "Имя", accessor: "first_name" },
  { title: "Фамилия", accessor: "last_name" },
  { title: "Email", accessor: "email" },
];

export const UsersTable = ({ users, loading }: UsersTableProps) => {
  const navigate = useNavigate();

  if (loading) return <div className="table-message">Загрузка...</div>;
  if (users.length === 0)
    return <div className="table-message">Пользователи не найдены</div>;

  const rows: TableRow[] = users.map((user) => ({
    id: String(user.id),
    first_name: user.name.split(" ")[0] || "",
    last_name: user.name.split(" ")[1] || "",
    email: user.email,
  }));

  return (
    <div className="users-table">
      <Table
        columns={columns}
        rows={rows}
        onRowClick={(row) => navigate(`/users/${row.id}`)}
        zebraStriped="odd"
        borderBetweenRows
      />
    </div>
  );
};
