import React from "react";
import "./CompanyDetailes.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Card, Button, ListGroup, Dropdown, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faPhone, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import HeaderSearchAdvanced from "../../Components/HeaderSearchAdvanced/HeaderSearchAdvanced";

const properties = [
  {
    price: "6,500,000 ج.م",
    type: "شقة",
    beds: 3,
    baths: 3,
    area: "160 متر مربع",
    location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
    description: "شقة للبيع في أرقى قرى الحي اللاتيني بالعلمين الجديدة، مطب بمقدم 50...",
    images: [card1, card2, card3],
  },
  {
    price: "23,503,500 ج.م",
    type: "هاوس",
    beds: 4,
    baths: 4,
    area: "216 متر مربع",
    description: "شقة للبيع في أرقى قرى الحي اللاتيني بالعلمين الجديدة، مطب بمقدم 50...",
    location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
    images: [card2, card1, card3],
  },
  {
    price: "23,503,500 ج.م",
    type: "هاوس",
    beds: 4,
    baths: 4,
    area: "216 متر مربع",
    description: "شقة للبيع في أرقى قرى الحي اللاتيني بالعلمين الجديدة، مطب بمقدم 50...",
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
    description: "شقة للبيع في أرقى قرى الحي اللاتيني بالعلمين الجديدة، مطب بمقدم 50...",
    images: [card7, card8, card9],
  },
  {
    price: "23,503,500 ج.م",
    type: "هاوس",
    beds: 4,
    baths: 4,
    area: "216 متر مربع",
    description: "شقة للبيع في أرقى قرى الحي اللاتيني بالعلمين الجديدة، مطب بمقدم 50...",
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

export default function CompanyDetailes() {
  const location = useLocation();
  const { companyName, propertiesForSale, propertiesForRent } = location.state || {};

  return (
    <>
      <Header />
      <Container className="mt-4">
      <Row>
          <Col md={12} className="text-center"> 
            <h2 className="mb-5" style={{color:"#0d6efd",fontWeight:"700"}}>{companyName}</h2>
  <div className="d-flex justify-content-around align-items-center">
              <p className="fs-5"> <span style={{color:"#0d6efd",fontWeight:"700"}}>{propertiesForSale}</span>  : عقارات للبيع</p>
              <p className="fs-5"><span style={{color:"#0d6efd",fontWeight:"700"}}>{propertiesForRent}</span>  : عقارات للايجار</p>
  </div>
  <hr />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <Button variant="outline-primary">الإيميل</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4} dir="rtl">
            <h4 className="mb-3" style={{color:"#0d6efd",fontWeight:"700"}}>نبذة تعريفية</h4>
            <p style={{color:"#888",fontWeight:"700"}}>أنواع العقارات: فلل، تاون هاوس، شقق، شاليهات، توين هاوس، دوبلكس، مكاتب، عقارات تجارية أخرى، بنتهاوس، محلات تجارية، غرف، مطاعم وكافيهات</p>
            <p style={{color:"#888",fontWeight:"700"}}>مناطق الاختصاص: القاهرة، الجيزة، مطروح، السويس، الإسكندرية</p>
            <p style={{color:"#888",fontWeight:"700"}}>مناطق الاختصاص: القاهرة، الجيزة، مطروح، السويس، الإسكندرية</p>
            <p style={{color:"#888",fontWeight:"700"}}>مناطق الاختصاص: القاهرة، الجيزة، مطروح، السويس، الإسكندرية</p>
            <p style={{color:"#888",fontWeight:"700"}}>مناطق الاختصاص: القاهرة، الجيزة، مطروح، السويس، الإسكندرية</p>
          
          </Col>
          <Col md={8}>
            {properties.map((property, index) => (
              <Card key={index} className="mb-3">
                <Row noGutters>
                  <Col md={6}>
                    <Slider {...settings}>
                      {property.images.map((image, idx) => (
                        <Link to={`/moreDeteliesPage/${idx}`} className="link" key={idx}>
                          <img
                            src={image}
                            alt={`imgCard-${idx}`}
                            style={{ width: "100%", height: "100%" }}
                          />
                          <h6 style={{ color: "#0d6efd" }} className="my-3">
                            الصور المتاحة لهذا العقار
                          </h6>
                        </Link>
                      ))}
                    </Slider>
                  </Col>
                  <Col md={6}>
                    <Card.Body style={{ textAlign: "right" }}>
                      <Card.Title style={{ color: "#123", fontWeight: "700", fontSize: "28px" }}>
                        {property.price}
                      </Card.Title>
                      <Card.Text>
                        <Row className="mb-2">
                          <Col style={{ color: "#0d6efd" }}>
                            <FontAwesomeIcon icon={faHome} /> {property.type}
                          </Col>
                          <Col style={{ color: "#0d6efd" }}>
                            <FontAwesomeIcon icon={faBed} /> {property.beds}
                          </Col>
                          <Col style={{ color: "#0d6efd" }}>
                            <FontAwesomeIcon icon={faBath} /> {property.baths}
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ color: "#868686" }}>
                            المساحة: {property.area}
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ color: "#0d6efd" }} className="my-2">
                            {property.description}
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ color: "#123" }} className="my-2">
                            {property.location}
                          </Col>
                        </Row>
                      </Card.Text>
                      <Button variant="primary">
                        <FontAwesomeIcon icon={faPhone} /> اتصل
                      </Button>
                      <Button variant="secondary" className="ms-1 me-1">
                        <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                      </Button>
                      <Button variant="success">
                        <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
