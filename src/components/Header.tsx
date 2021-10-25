import React from "react";

import "./Header.scss";

export default function Header() {
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
