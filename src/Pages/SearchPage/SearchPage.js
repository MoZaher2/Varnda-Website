import React, { useState } from "react";
import "./SearchPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSearchAdvanced from "../../Components/HeaderSearchAdvanced/HeaderSearchAdvanced";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "../../Components/Cards/Card";


import { useLocation, useNavigate } from "react-router-dom";
import AddPropertyCard from "../../Components/Cards/AddProperty/AddPropertyCard";
import AddQuickCard from "../../Components/Cards/AddProperty/AddQuickCard";
// import queryString from "query-string";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchPage() {

  const query = useQuery();//
  const navigate = useNavigate();//
  const [properties,setProperties]=useState([])

  return (
    <>
      <Header />
      <HeaderSearchAdvanced query={query} navigate={navigate} setProperties={setProperties}/>
      {/* <hr /> */}

      <Container>
        <Row className="d-flex justify-content-between">
          <Col md={8} dir="rtl">
            {/* <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 style={{ color: "#0d6efd" }}>عقارات سكنية للبيع في مَصر</h5>
              <Dropdown>
                <Dropdown.Toggle variant="primary">{filter}</Dropdown.Toggle>
                <Dropdown.Menu style={{ textAlign: "right" }}>
                  {searchFilter.map((option) => (
                    <Dropdown.Item
                      key={option}
                      onClick={() => handleFilterChange(option)}
                      active={filter === option}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
            {/* ال Card */}
            <PropertyCard properties={properties}/>
          </Col>

          <Col md={4} dir="rtl">
            {/* <Link to="/findHomePage">
              <img src={imgCard} alt="imgCard" />
            </Link> */}

            <h4 className="my-3 h4">نتائج مقترحة</h4>
            <ListGroup variant="flush">
              <Link to="/SearchPage/القاهرة?filter=الأحدث&rooms=1&selectedOption=sale" className="link-item">
                <ListGroup.Item className="item">
                  عقارات 1 غرفة للبيع فى القاهرة
                </ListGroup.Item>
              </Link>
              <Link to="/SearchPage/القاهرة?filter=الأحدث&rooms=2&selectedOption=sale" className="link-item">
                <ListGroup.Item className="item">
                  عقارات 2 غرفة للبيع فى القاهرة
                </ListGroup.Item>
              </Link>
              <Link to="/SearchPage/القاهرة?filter=الأحدث&rooms=0&selectedOption=sale" className="link-item">
                <ListGroup.Item className="item">
                 عقارات استوديو للبيع فى القاهرة
                </ListGroup.Item>
              </Link>
              <Link to="/SearchPage?selectedOption=rent" className="link-item">
                <ListGroup.Item className="item">عقارات للايجار</ListGroup.Item>
              </Link>
            </ListGroup>

            {/* <h4 className="my-3 h4">روابط مفيدة</h4>
            <ListGroup variant="flush">
              <Link to="/SearchPage" className="link-item">
                <ListGroup.Item className="item">
                  عقارات 1 غرفة للبيع فى مصر
                </ListGroup.Item>
              </Link>
              <Link to="/SearchPage" className="link-item">
                <ListGroup.Item className="item">
                  عقارات 2 غرفة للبيع فى مصر
                </ListGroup.Item>
              </Link>
              <Link to="/SearchPage" className="link-item">
                <ListGroup.Item className="item">
                  عقارات استوديو للبيع
                </ListGroup.Item>
              </Link>
              <Link to="/SearchPage" className="link-item">
                <ListGroup.Item className="item">عقارات للايجار</ListGroup.Item>
              </Link>
            </ListGroup> */}

          </Col>
        </Row>
      </Container>
      <AddPropertyCard/>
      <Footer />
      <AddQuickCard/>
    </>
  );
}
