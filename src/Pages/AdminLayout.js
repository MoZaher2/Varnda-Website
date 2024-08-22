import AdminSidebar from "../Components/Dashboard/AdminSidebar";
import { Row, Col, Navbar } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
export default function AdminLayout() {

    return (
        <>
        <Row>
            <Col lg={3} md={4}>
            <Navbar bg="light" expand="md">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <AdminSidebar/>
                </Navbar.Collapse>
            </Navbar>
            </Col>
            <Col lg={9} md={8} > 
                    <Outlet /> {/* This is where child routes will be rendered */}
                </Col>
            </Row>
        </>
    );
}
// lg="10" md="12" sm="12"



