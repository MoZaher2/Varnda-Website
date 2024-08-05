import React, { useState } from "react";
import "./SearchPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faPhone,
  faEnvelope,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSearchAdvanced from "../../Components/HeaderSearchAdvanced/HeaderSearchAdvanced";
import imgCard from "../../images/image_card.png";
import card1 from "../../images/card_1.png";
import card2 from "../../images/card_2.png";
import card3 from "../../images/card_3.png";
import card4 from "../../images/card_4.png";
import card5 from "../../images/card_5.png";
import card6 from "../../images/card_6.png";
import card7 from "../../images/card_13.png";
import card8 from "../../images/card_8.png";
import card9 from "../../images/card_9.png";
import card10 from "../../images/card_10.png";
import card11 from "../../images/card_11.png";
import card12 from "../../images/card_12.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "../../Components/Cards/Card";


import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchPage() {

  const query = useQuery();//
  const navigate = useNavigate();//
  const [properties,setProperties]=useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // Filter search result
  const [filter,setFilter]=useState("الأحدث")
  const searchFilter=["الأحدث","الاقل سعر","الاعلى سعر"]
  const handleFilterChange = (option) => {
    setFilter(option);
  };

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
      <Footer />
    </>
  );
}
