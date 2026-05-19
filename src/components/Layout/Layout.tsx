import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">GoRest Dashboard</h1>
        <Navigation />
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
};
