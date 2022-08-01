import React from "react";
import Link from '@mui/material/Link';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li><Link color="#000" underline="none" href="/">Home</Link></li>
        <li><Link color="#000" underline="none" href="/our-Story">Our Story</Link></li>
        <div className="dropdown">
          <div className="dropbtn"><Link color="#000" underline="none" href="/services">Services</Link></div>
          <div className="dropdown-content">
            <Link href="/">Leadership Mentoring and Coaching</Link>
            <Link href="/">High Performance Workshops</Link>
            <Link href="/">INFINITE Leadership Program</Link>
            <Link href="/">21 Day Lead Yourself Challenge</Link>
          </div>
        </div>
        <li><Link color="#000" underline="none" href="/contact">Contact</Link></li>
        <li className="nav-signin"><Link href="/signin">Sign in</Link></li>
      </ul>
    </nav>

  );
}
