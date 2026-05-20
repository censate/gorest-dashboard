import { useState } from "react";
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import { useAuthStore } from "../../store/authStore";
import "./TokenInput.css";

export const TokenInput = () => {
  const { token, setToken } = useAuthStore();
  const [inputValue, setInputValue] = useState<string | undefined | null>(
    token,
  );
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!inputValue || !inputValue.trim()) {
      setError("Токен не может быть пустым");
      return;
    }
    setError("");
    setToken(inputValue.trim());
  };

  return (
    <div className="token-input">
      <TextField
        value={inputValue}
        onChange={({ value }) => setInputValue(value)}
        placeholder="Введите Access Token"
        type="password"
        size="s"
        caption={error}
        status={error ? "alert" : undefined}
        form="defaultBrick"
      />
      <Button
        label="Сохранить"
        size="s"
        onClick={handleSave}
        className="token-save-btn"
      />
    </div>
  );
};
