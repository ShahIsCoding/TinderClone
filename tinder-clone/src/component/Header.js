import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

function Header({ backButton, card }) {
  const location = useLocation();
  return (
    <div className="header">
      {backButton ? (
        <IconButton onClick={() => location.replace(backButton)}>
          <ArrowBackIosIcon className="header__icon" fontSize="large" />
        </IconButton>
      ) : (
        <Link to="/profile">
          <IconButton>
            <PersonIcon className="header__icon" fontSize="large" />
          </IconButton>
        </Link>
      )}
      <Link to="/cards">
        <img
          className="header__logo"
          src="assets/tinder.png"
          alt="tinder__logo"
        />
      </Link>
      {card !== "chat" ? (
        <Link to="/chat">
          <IconButton>
            <ForumIcon fontSize="large" className="header__icon" />
          </IconButton>
        </Link>
      ) : (
        <Link to="/likes">
          <IconButton>
            <FavoriteIcon fontSize="large" className="header__icon" />
          </IconButton>
        </Link>
      )}
    </div>
  );
}

export default Header;
