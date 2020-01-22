import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const AppNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
            <Navbar color='dark' dark expand='sm'>
                <NavbarBrand href='/quizzes'>Quiz App</NavbarBrand>
                <NavbarToggler onClick={toggle} />  
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/quizzes/">My Quizzes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/create/">Create New Quiz</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Log Out</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>User's Name</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppNavBar;