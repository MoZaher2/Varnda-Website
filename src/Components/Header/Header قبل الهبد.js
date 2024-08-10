import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Header.css"
import { ReactComponent as Logo } from '../../images/logo.svg';
import {
  faSignInAlt,
  faStar,
  faHeart,
  faPlus,
  faCog,
  faHome,
  faSignOutAlt,
  faUser,
  faFileAlt,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import api from "../../API/ApiLink";
export default function Header() {
  const navigate = useNavigate()
  const token = Cookies.get('token')
  const role = localStorage.getItem("role")
  const Logout = async () => {
    try {
      const response = await api.post("/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }finally{
      localStorage.removeItem("role");
      Object.keys(Cookies.get()).forEach(function(cookieName) {
        Cookies.remove(cookieName);
    });
      navigate("/")
    }
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/" className="logo-cont">
            <Logo className="logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="d-flex">
              {!token && <Nav.Link as={Link} to="/login">
                <FontAwesomeIcon icon={faSignInAlt} className="ms-2" />
                تسجيل الدخول
              </Nav.Link>}
              {/* <Nav.Link>
               <FontAwesomeIcon icon={faStar} className="ms-2" />
               البحث المحفوظ
             </Nav.Link> */}
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
                <NavDropdown.Item as={Link} to="/articles" className="text-end">
                  <FontAwesomeIcon icon={faFileAlt} className="ms-2" />
                  المدونة
                </NavDropdown.Item>
                {role === "admin" && <NavDropdown.Item as={Link} to="/dashboard" className="text-end">
                  <FontAwesomeIcon icon={faTachometerAlt} className="ms-2" />
                  لوحه التحكم
                </NavDropdown.Item>
                }
                {token &&
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="text-end" onClick={Logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="ms-2" />
                      تسجيل خروج
                    </NavDropdown.Item>
                  </>
                }
              </NavDropdown>
              <Nav.Link as={Link} to="/submit-property" >
                <FontAwesomeIcon icon={faPlus} className="ms-2" />
                اضف عقار
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={{ margin: "0px" }} />
    </>
  );
}
