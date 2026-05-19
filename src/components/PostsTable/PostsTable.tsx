import { useNavigate } from "react-router-dom";
import { Table } from "@consta/uikit/Table";
import type { Post } from "../../types";
import "./PostsTable.css";

interface PostsTableProps {
  posts: Post[];
  loading: boolean;
}

interface TableRow {
  id: string;
  title: string;
}

const columns = [
  { title: "ID", accessor: "id" as keyof TableRow },
  { title: "Заголовок", accessor: "title" as keyof TableRow },
];

export const PostsTable = ({ posts, loading }: PostsTableProps) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className="table-message">Загрузка...</div>;
  }

  if (posts.length === 0) {
    return <div className="table-message">Посты не найдены</div>;
  }

  const rows: TableRow[] = posts.map((post) => ({
    id: String(post.id),
    title: post.title,
  }));

  return (
    <div className="posts-table">
      <Table
        columns={columns}
        rows={rows}
        onRowClick={(row) => navigate(`/posts/${row.id}`)}
        size="m"
        zebraStriped="odd"
        borderBetweenRows
      />
    </div>
  );
};
