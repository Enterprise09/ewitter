import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navigation.css";

const Navigation = ({ userObj }) => (
  <nav className="nav">
    <ul>
      <li className="empty_li"></li>
      <li>
        <Link to="/">
          <FontAwesomeIcon
            className="nav_icon"
            icon={faTwitter}
            color={"rgb(138, 65, 255)"}
            size="2x"
          />
        </Link>
        <div className="nav_username">Ewitter</div>
      </li>
      <li>
        <Link className="profile_link" to="/profile">
          <FontAwesomeIcon
            className="nav_icon"
            icon={faUser}
            color={"rgb(138, 65, 255)"}
            size="2x"
          />
        </Link>
        <div className="nav_username">
          {userObj.displayName ? `${userObj.displayName}` : "Profile"}
        </div>
      </li>
      <li className="empty_li"></li>
    </ul>
  </nav>
);

export default Navigation;
