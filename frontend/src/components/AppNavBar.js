import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";

const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <NavbarBrand href="/quizzes">My Quizzes</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#">Log Out</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>User's Name</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
