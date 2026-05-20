import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { UsersPage } from "./pages/UsersPage/UsersPage";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import { UserCardPage } from "./pages/UserCardPage/UserCardPage";
import { PostCardPage } from "./pages/PostCardPage/PostCardPage";
import { useAuthStore } from "./store/authStore";
import { LoginPage } from "./components/LoginPage/LoginPage";
import "./App.css";

function App() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/users" replace />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserCardPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts/:id" element={<PostCardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
