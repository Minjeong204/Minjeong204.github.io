import React from "react";
import { Link } from "react-router-dom";
import "../css/Main.css";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/count" className="nav-link">
                카운터
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/axios" className="nav-link">
                axios
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clock" className="nav-link">
                시계
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/todo" className="nav-link">
                투두리스트
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
