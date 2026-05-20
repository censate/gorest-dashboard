import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@consta/uikit/Button";
import { useAuthStore } from "../../store/authStore";
import "./Navigation.css";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isValid = useAuthStore((state) => state.isValid());

  if (!isValid) return null;

  const isUsers =
    location.pathname.includes("/users") || location.pathname === "/";

  return (
    <div className="navigation">
      <Button
        label="Пользователи"
        view={isUsers ? "primary" : "secondary"}
        size="s"
        onClick={() => navigate("/users")}
      />
      <Button
        label="Посты"
        view={!isUsers ? "primary" : "secondary"}
        size="s"
        onClick={() => navigate("/posts")}
      />
    </div>
  );
};
