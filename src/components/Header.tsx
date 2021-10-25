import { Alignment, Button, Navbar } from "@blueprintjs/core";
import React from "react";

import "./Header.scss";

export default function Header() {
  if (true) {
    return (
      <nav className="app-header flex items-center justify-between h-16 p-8">
        <div className="button">Irrelevants (Logo)</div>
        <div className="flex w-1/2">
          <div className="button mr-5 w-full">Home</div>
          <div className="button mr-5 w-full">Rarity</div>
          <div className="button mr-5 w-full">Roadmap</div>
        </div>
        <div className="flex">
          <div className="button mr-4">D</div>
          <div className="button">T</div>
        </div>
      </nav>
    );
  }
  return (
    <section className="header">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Artificial Irrelevants</Navbar.Heading>
          <Navbar.Divider />
          <a
            className="header__nav-link is-size-7"
            href="https://www.irrelevants.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bp3-minimal" icon="home" text="Home" />
          </a>
          <a
            className="header__nav-link is-size-7"
            href="https://www.irrelevants.com/schedule-copy"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bp3-minimal" icon="map" text="Roadmap" />
          </a>
          <a
            className="header__nav-link is-size-7"
            href="https://discord.gg/REC4VYpJKw"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bp3-minimal" icon="chat" text="Discord" />
          </a>
          <a
            className="header__nav-link is-size-7"
            href="https://mint.irrelevants.com/rarity"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bp3-minimal" icon="search" text="Rarity" />
          </a>
        </Navbar.Group>
      </Navbar>
    </section>
  );
}
