import React from 'react'
import "./AreaPage.css"
import Button from "react-bootstrap/Button";

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
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import HeaderSearchAdvanced from '../../Components/HeaderSearchAdvanced/HeaderSearchAdvanced'
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
export default function AreaPage() {

  const properties = [
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",
      location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      images: [card1, card2, card3],
    },
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",
      location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      images: [card4, card5, card6],
    },
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",
      location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      images: [card7, card8, card9],
    },
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",

      location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      images: [card10, card11, card12],
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    <Header />
<HeaderSearchAdvanced />
<Row className="mb-3">
  <Col xs={12} lg={7}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1800612.7892897576!2d31.841395786137394!3d28.182332788875105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1444c357043f1853%3A0xe64e2c0c449c8b68!2z2YXYrdin2YHYuNipINin2YTZhdmG2YrYpw!5e0!3m2!1sar!2seg!4v1719750885798!5m2!1sar!2seg"
      width="100%"
      height="450"
    ></iframe>
  </Col>
  <Col xs={12} lg={5} style={{ height: "450px", overflowY: "scroll" }}>
    <Row>
    <Link to="/SearchPage" dir="rtl">الرجوع إلى البحث العادى </Link>
    <h5 dir="rtl" style={{ color: "#0d6efd" }} className="mb-4 mt-3">عقارات سكنية للبيع في مَصر</h5>
      {properties.map((property, index) => (
        <Col xs={12} lg={6} key={index} className="mb-3">
          
          <Card>
            <div style={{ width: "100%", height: "auto" }}>
              <Slider {...settings}>
                {property.images.map((image, idx) => (
                  <Link to={`/moreDeteliesPage/${idx}`} className="link" key={idx}>
                    <img
                      src={image}
                      alt={`imgCard-${idx}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <h6 style={{ color: "#0d6efd",fontSize: "15px", }} className="my-3">
                      الصور المتاحة لهذا العقار
                    </h6>
                  </Link>
                ))}
              </Slider>
              <Card.Body style={{ textAlign: "right" }}>
                <Card.Title
                  style={{
                    color: "#123",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  {property.price}
                </Card.Title>
                <Card.Text>
                  <Row className="mb-2">
                    <Col style={{ color: "#0d6efd" ,fontSize: "12px"}}>
                      <FontAwesomeIcon icon={faHome} /> {property.type}
                    </Col>
                    <Col style={{ color: "#0d6efd" ,fontSize: "12px"}}>
                      <FontAwesomeIcon icon={faBed} /> {property.beds}
                    </Col>
                    <Col style={{ color: "#0d6efd" ,fontSize: "12px"}}>
                      <FontAwesomeIcon icon={faBath} /> {property.baths}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ color: "#868686" ,fontSize: "14px"}}>
                      المساحة: {property.area}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ color: "#123" ,fontSize: "14px",marginTop:"8px"}}>
                    {property.location}
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </Col>
</Row>



    <Footer />
      
    </>
  )
}
