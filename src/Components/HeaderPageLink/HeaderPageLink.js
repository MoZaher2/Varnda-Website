import React, { useEffect, useState } from 'react'
import "./HeaderPageLink.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import api from "../../API/ApiLink.js";
export default function HeaderPageLink() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get(`/getallcategories`);
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

  return (
    <>
    <Navbar bg="light" data-bs-theme="light" dir="rtl">
        <Container>
          <Nav>
            {categories.map((category) => (
              <div className="page-link" key={category.id}>
                <Nav.Link href={`/Blogs/${category.category_name}`} className="link">
                  {category.category_name}
                </Nav.Link>
              </div>
            ))}
            {/* <Link to="/advicePage" className="page-link"><Nav.Link href="/advicePage" className="link">نصائح</Nav.Link></Link>
            <Link to="/mixPage" className="page-link"><Nav.Link href="/mixPage" className="link">منوعات</Nav.Link></Link>
            <Link to="/marketPage" className="page-link"><Nav.Link href="/marketPage" className="link">اتجاهات السوق</Nav.Link></Link>
            <Link to="/regionsOfEgyptPage" className="page-link"><Nav.Link href="/regionsOfEgyptPage" className="link">مناطق مصر</Nav.Link></Link>
            <Link to="/eventsPage" className="page-link"><Nav.Link href="/eventsPage" className="link">فعليات واخبار بيوت مصر</Nav.Link></Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
