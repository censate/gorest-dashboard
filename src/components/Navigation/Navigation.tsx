import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@consta/uikit/Button";
import { useAuthStore } from "../../store/authStore";
import type { ViewMode } from "../../types";
import "./Navigation.css";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isValid = useAuthStore((state) => state.isValid());

  const currentMode: ViewMode = location.pathname.includes("/posts")
    ? "posts"
    : "users";

  const handleModeChange = (mode: ViewMode) => {
    if (mode === "users") {
      navigate("/users");
    } else {
      navigate("/posts");
    }
  };

  if (!isValid) return null;

  return (
    <div className="navigation">
      <Button
        label="Пользователи"
        view={currentMode === "users" ? "primary" : "secondary"}
        size="s"
        onClick={() => handleModeChange("users")}
      />
      <Button
        label="Посты"
        view={currentMode === "posts" ? "primary" : "secondary"}
        size="s"
        onClick={() => handleModeChange("posts")}
      />
    </div>
  );
};
