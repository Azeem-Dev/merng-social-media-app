import { useState, useEffect } from "react";
import "./MenuBar.css";
import { NavLink, useLocation } from "react-router-dom";
import useWindowDimensions from "../../utils/windowResizeHandler";
const MenuBar = () => {
  const { height, width } = useWindowDimensions();
  const [flex, setFlex] = useState(width > 768 ? true : false);

  useEffect(() => {
    setFlex(width > 768 ? true : false);
  }, [width]);
  let location = useLocation();
  const currentOpenedTab = location.pathname.split("/")[1];
  return (
    <nav className="navbar" style={{ marginBottom: "20px" }}>
      <div className="container">
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            data-toggle="open-navbar1"
            onClick={() => setFlex((prevvalue) => !prevvalue)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <NavLink to="/">
            <h4>
              Social<span>Media</span>
            </h4>
          </NavLink>
        </div>

        <div
          className="navbar-menu"
          id="open-navbar1"
          style={{ display: `${flex ? "flex" : "none"}` }}
        >
          <ul className="navbar-nav">
            <li className={currentOpenedTab === "" ? "active" : ""}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={currentOpenedTab === "login" ? "active" : ""}>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className={currentOpenedTab === "register" ? "active" : ""}>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default MenuBar;
