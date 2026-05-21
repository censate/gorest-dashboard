import { useEffect } from "react";
import { PostsTable } from "../../components/PostsTable/PostsTable";
import { PaginationControl } from "../../components/PaginationControl/PaginationControl";
import { usePostsStore } from "../../store/postsStore";
import "./PostsPage.css";

export const PostsPage = () => {
  const { posts, pagination, perPage, loading, error, fetchPosts, setPerPage } =
    usePostsStore();

  useEffect(() => {
    fetchPosts(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="posts-page">
      <h2 className="posts-page__title">Список постов</h2>
      {error && <div className="error-message">{error}</div>}
      <PostsTable posts={posts} loading={loading} />
      {posts.length > 0 && (
        <PaginationControl
          pagination={pagination}
          perPage={perPage}
          onPageChange={fetchPosts}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};
