import { useState } from "react";
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { useAuthStore } from "../../store/authStore";
import "./LoginPage.css";

export const LoginPage = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const [value, setValue] = useState<string | undefined | null>("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!value || !value.trim()) {
      setError("Токен не может быть пустым.");
      return;
    }
    setError("");
    setToken(value.trim());
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>GoRest Dashboard</h1>
        <p className="login-desc">Введите Access Token для доступа к API</p>
        <div className="login-field">
          <TextField
            value={value}
            onChange={({ value }) => setValue(value)}
            placeholder="Access Token"
            type="password"
            size="s"
            caption={error}
            status={error ? "alert" : undefined}
            form="defaultClear"
          />
        </div>
        <div className="login-btn-wrapper">
          <Button
            label="Подключиться"
            size="s"
            width="full"
            onClick={handleSave}
          />
        </div>
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
