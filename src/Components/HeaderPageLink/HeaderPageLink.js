import React, { useEffect, useState } from 'react'
import "./HeaderPageLink.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import api from "../../API/ApiLink.js";
export default function HeaderPageLink({activeCategory}) {
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
          <Nav className="linkCont">
            {categories.map((category) => (
              <div className="page-link" key={category.id}>
                <Nav.Link href={`/Blogs/${category.category_name}`} className={`link ${category.category_name === activeCategory ? "activelink" : ""}`}>
                  {category.category_name}
                </Nav.Link>
              </div>
            ))}
            </Nav>
        </Container>
      </Navbar>
    </>
  )
}
