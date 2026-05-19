import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { UsersPage } from "./pages/UsersPage/UsersPage";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import { UserCardPage } from "./pages/UserCardPage/UserCardPage";
import { PostCardPage } from "./pages/PostCardPage/PostCardPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/users" replace />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserCardPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts/:id" element={<PostCardPage />} />
      </Route>
    </Routes>
  );
}

const MainLayout = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const location = useLocation();

  if (!token) {
    return <LoginPage />;
  }

  const isUsers =
    location.pathname.includes("/users") || location.pathname === "/";

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">⚡</span>
          GoRest Dashboard
        </h1>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${isUsers ? "active" : ""}`}
            onClick={() => navigate("/users")}
          >
            <span className="nav-icon">👥</span>
            Пользователи
          </button>
          <button
            className={`nav-btn ${!isUsers ? "active" : ""}`}
            onClick={() => navigate("/posts")}
          >
            <span className="nav-icon">📝</span>
            Посты
          </button>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

const LoginPage = () => {
  const { setToken } = useAuthStore();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!value.trim()) {
      setError("Токен не может быть пустым");
      return;
    }
    setError("");
    setToken(value.trim());
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">⚡</div>
        <h1>GoRest Dashboard</h1>
        <p className="login-desc">Введите Access Token для доступа к API</p>
        <div className="input-wrapper">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Access Token"
            className="login-input"
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button onClick={handleSave} className="login-btn">
          Подключиться
        </button>
        <a
          href="https://gorest.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="login-link"
        >
          Получить токен на gorest.co.in →
        </a>
      </div>
    </div>
  );
};

export default App;
