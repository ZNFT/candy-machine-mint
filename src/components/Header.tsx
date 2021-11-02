import React from "react";
import logo from "../images/home-logo.png";
import twitter from "../images/twitter.png";
import discord from "../images/discord.png";
import { Link } from "react-router-dom";

import "./Header.scss";

export default function Header() {
  return (
    <nav className="app-header flex items-center justify-between h-16 p-8">
      <div className="button">
        <a href="https://www.irrelevants.com">
          <img className="app-header__logo" src={logo} alt="home logo" />
        </a>
      </div>
      <div className="flex w-1/2">
        <div className="button mr-5 w-full">
          <Link to="/rarity">Rarity</Link>
        </div>
        <div className="button mr-5 w-full">
          <a href="https://www.irrelevants.com/schedule-copy">Roadmap</a>
        </div>
      </div>
      <div className="flex">
        <div className="button mr-4">
          <a
            href="https://discord.com/invite/REC4VYpJKw"
            target="_blank"
            rel="noreferrer"
          >
            <img className="app-header__icon" src={discord} alt="discord" />
          </a>
        </div>
        <div className="button">
          <a
            href="https://twitter.com/Irrelevants_NFT"
            target="_blank"
            rel="noreferrer"
          >
            <img className="app-header__icon" src={twitter} alt="twitter" />
          </a>
        </div>
      </div>
    </nav>
  );
}
