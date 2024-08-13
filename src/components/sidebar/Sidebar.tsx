import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faGear,
  faUser,
  faSignOut,
  faSignature,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

import "./sidebar.style.css";
import { useAuth } from "../../hooks";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li className="sidebar-link">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="nav-icon-box">
              <FontAwesomeIcon icon={faSignature} />
            </div>
            <p>signatures</p>
          </NavLink>
        </li>
        <li className="sidebar-link">
          <NavLink
            to="/all-staff"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="nav-icon-box">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <p>all staff</p>
          </NavLink>
        </li>
        <li className="sidebar-link">
          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="nav-icon-box">
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
            </div>
            <p>payment report</p>
          </NavLink>
        </li>
        <li className="sidebar-link">
          <a href="#">
            <div className="nav-icon-box">
              {" "}
              <FontAwesomeIcon icon={faMoneyBill1Wave} />
            </div>
            <p>payment config</p>
          </a>
        </li>
      </ul>
      <ul className="sidebar-links">
        <li className="sidebar-link">
          <a href="#">
            <div className="nav-icon-box">
              <FontAwesomeIcon icon={faGear} />
            </div>

            <p>settings</p>
          </a>
        </li>
      </ul>
      <div className="logout-btn__container">
        <a
          href="#"
          className="logout-btn"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <FontAwesomeIcon icon={faSignOut} />
          <p>Logout</p>
        </a>
      </div>
    </div>
  );
}
