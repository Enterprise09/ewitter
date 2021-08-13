import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navigation.css";

const Navigation = ({ userObj }) => (
  <nav className="nav">
    <ul
      style={{
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <li>
        <Link to="/" style={{ marginRight: "20px", flex: "1" }}>
          <FontAwesomeIcon
            className="nav_icon"
            icon={faTwitter}
            color={"rgb(138, 65, 255)"}
            size="2x"
          />
        </Link>
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
      </li>
    </ul>
  </nav>
);

export default Navigation;
