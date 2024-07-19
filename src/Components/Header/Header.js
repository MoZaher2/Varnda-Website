import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faStar,
  faHeart,
  faPlus,
  faCog,
  faHome,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="d-flex">
            <Nav.Link as={Link} to="/login">
              <FontAwesomeIcon icon={faSignInAlt} className="ms-2" />
              تسجيل الدخول
            </Nav.Link>
            <Nav.Link>
              <FontAwesomeIcon icon={faStar} className="ms-2" />
              البحث المحفوظ
            </Nav.Link>
            <Nav.Link as={Link} to="/fav">
              <FontAwesomeIcon icon={faHeart} className="ms-2" />
              المفضلة
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <span>
                  <FontAwesomeIcon icon={faUser} className="ms-2" />
                  حسابى
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={Link} to="/myprofile" className="text-end">
                <FontAwesomeIcon icon={faCog} className="ms-2" />
                الاعدادات
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/myproperties" className="text-end">
                <FontAwesomeIcon icon={faHome} className="ms-2" />
                تصفح عقاراتك
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout" className="text-end">
                <FontAwesomeIcon icon={faSignOutAlt} className="ms-2" />
                تسجيل خروج
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/submit-property" >
              <FontAwesomeIcon icon={faPlus} className="ms-2" />
              اضف عقار
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}