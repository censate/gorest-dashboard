import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { User } from "../../types";
import { api } from "../../api";
import "./UserCardPage.css";

export const UserCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.getUser(Number(id));
        setUser(data);
      } catch (err) {
        console.error("Ошибка загрузки пользователя:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="table-message">Загрузка...</div>;
  }

  if (!user) {
    return <div className="table-message">Пользователь не найден</div>;
  }

  return (
    <div className="user-card">
      <button className="user-card__back" onClick={() => navigate("/users")}>
        ← Назад к списку
      </button>
      <div className="user-card__content">
        <div className="user-card__avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="user-card__name">{user.name}</h2>
        <div className="user-card__info">
          <div className="user-card__field">
            <div className="user-card__label">Email</div>
            <div className="user-card__value">{user.email}</div>
          </div>
          <div className="user-card__field">
            <div className="user-card__label">Пол</div>
            <div className="user-card__value">
              {user.gender === "male" ? "Мужской" : "Женский"}
            </div>
          </div>
          <div className="user-card__field">
            <div className="user-card__label">Статус</div>
            <div className="user-card__value">
              <span className={`status-badge status-${user.status}`}>
                {user.status === "active" ? "Активен" : "Неактивен"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
