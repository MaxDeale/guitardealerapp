import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-dark">
      <h1 style={{ fontFamily: "pacifico", letterSpacing: "3px" }}>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
      </ul>
    </nav>
  );
};

NavBar.defaultProps = {
  title: "iTunes Finder",
  icon: "fab fa-itunes "
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default NavBar;
