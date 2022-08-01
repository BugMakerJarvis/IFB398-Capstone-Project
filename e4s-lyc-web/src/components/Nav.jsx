import React, { useState } from "react";
import Link from '@mui/material/Link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="container col-8">
      <Navbar expand={"md"}>
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Our story</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Services
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Leadership Montoring and Coaching
                </DropdownItem>
                <DropdownItem>
                  High Performance Workshops
                </DropdownItem>
                <DropdownItem>
                  INFINITE Leadership Program
                </DropdownItem>
                <DropdownItem>
                  21 Day Lead Yourself Challenge
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/">Contact</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/signin">Sign in</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    // <nav>
    //   <ul>
    //     <li><Link color="#000" underline="none" href="/">Home</Link></li>
    //     <li><Link color="#000" underline="none" href="/our-Story">Our Story</Link></li>
    //     <div className="dropdown">
    //       <div className="dropbtn"><Link color="#000" underline="none" href="/services">Services</Link></div>
    //       <div className="dropdown-content">
    //         <Link href="/">Leadership Mentoring and Coaching</Link>
    //         <Link href="/">High Performance Workshops</Link>
    //         <Link href="/">INFINITE Leadership Program</Link>
    //         <Link href="/">21 Day Lead Yourself Challenge</Link>
    //       </div>
    //     </div>
    //     <li><Link color="#000" underline="none" href="/contact">Contact</Link></li>
    //     <li className="nav-signin"><Link href="/signin">Sign in</Link></li>
    //   </ul>
    // </nav>

  );
}
