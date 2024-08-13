import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "../../components";

import "./root.style.css";

export default function Root() {
  return (
    <div className="page">
      <Header />
      <div className="main-page">
        <Sidebar />
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
