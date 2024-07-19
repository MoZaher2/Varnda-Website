import React from 'react'
import "./HeaderPageLink.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
export default function HeaderPageLink({title}) {
  return (
    <>
  
    <Navbar bg="light" data-bs-theme="light" dir="rtl">
        <Container>
    
          <Nav>
            <Link to="/advicePage" className="page-link"><Nav.Link href="/advicePage" className="link">نصائح</Nav.Link></Link>
            <Link to="/mixPage" className="page-link"><Nav.Link href="/mixPage" className="link">منوعات</Nav.Link></Link>
            <Link to="/marketPage" className="page-link"><Nav.Link href="/marketPage" className="link">اتجاهات السوق</Nav.Link></Link>
            <Link to="/regionsOfEgyptPage" className="page-link"><Nav.Link href="/regionsOfEgyptPage" className="link">مناطق مصر</Nav.Link></Link>
            <Link to="/eventsPage" className="page-link"><Nav.Link href="/eventsPage" className="link">فعليات واخبار بيوت مصر</Nav.Link></Link>
          </Nav>
        </Container>
      </Navbar>

      <h2 className="text-center h1 title-page py-1 pb-2 container my-3">{title}</h2>
    </>
  )
}
