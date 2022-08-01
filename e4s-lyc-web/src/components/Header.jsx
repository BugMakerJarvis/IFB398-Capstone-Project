import React from "react";
import Nav from "./Nav";

export default function Header() {
  return (
    <header>
      {/* logo */}
      <div id="icon">
        <img src="img/logo.png" alt="Icon" title="" />
      </div>
      <Nav />
    </header>
  );
}
