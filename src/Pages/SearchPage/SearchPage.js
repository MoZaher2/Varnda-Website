import React from "react";
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

export default function SearchPage() {
  const properties = [
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",
      description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      rooms: "4 غرف 03500...",
      location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      images: [card1, card2, card3],
    },
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",
      description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      rooms: "4 غرف 03500...",
      location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      images: [card4, card5, card6],
    },
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",
      description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      rooms: "4 غرف 03500...",
      location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      images: [card7, card8, card9],
    },
    {
      price: "23,503,500 ج.م",
      type: "هاوس",
      beds: 4,
      baths: 4,
      area: "216 متر مربع",
      description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
      rooms: "4 غرف 03500...",
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

      <div className="d-flex align-items-center justify-content-between my-3 container">
        <Button variant="primary">حفظ البحث</Button>
        <Button variant="outline-primary">إعلانات المطورين أول</Button>
      </div>
      <hr />

      <Container>
        <Row className="d-flex justify-content-between">
          
        <Col md={8} dir="rtl">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 style={{ color: "#0d6efd" }}>عقارات سكنية للبيع في مَصر</h5>
              <ButtonGroup className="d-flex align-items-center justify-content-between groub-btns">
                <Dropdown>
                  <Dropdown.Toggle variant="primary">الاحدث</Dropdown.Toggle>
                  <Dropdown.Menu style={{ textAlign: "right" }}>
                    <Dropdown.Item href="#">
                      الاكثر مشاهدة
                    </Dropdown.Item>
                    <Dropdown.Item href="#">مطور عقارى</Dropdown.Item>
                    <Dropdown.Item href="#" active>
                      الاحدث
                    </Dropdown.Item>
                    <Dropdown.Item href="#">الاقل سعرا</Dropdown.Item>
                    <Dropdown.Item href="#">الاعلى سعرا</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="outline-primary">قائمة</Button>
                <Link to="/findHomePage">
                  <Button variant="outline-primary">الخريطة</Button>
                </Link>
              </ButtonGroup>
            </div>
            {properties.map((property, index) => (
              <Card className="d-flex flex-row mb-3">
                <div style={{ width: "50%", height: "auto" }}>
                  <Slider {...settings}>
                    {property.images.map((image, idx) => (
                <div>
                        <Link to={`/moreDeteliesPage/${idx}`} className="link" key={index}>
                          <img
                            src={image}
                            alt={`imgCard-${idx}`}
                            key={idx}
                            style={{ width: "100%", height: "100%" }}
                          />
                          <h6 style={{ color: "#0d6efd" }} className="my-3">
                            الصور المتاحة لهذا العقار
                          </h6>
                        </Link>
                  
              
<Button variant="primary" className="m-2 btn-sm">
<FontAwesomeIcon icon={faPhone} /> اتصل
</Button>
<Button variant="secondary" className="m-2 btn-sm">
<FontAwesomeIcon icon={faEnvelope} /> الإيميل
</Button>
<Button variant="success" className="m-2 btn-sm">
<FontAwesomeIcon icon={faWhatsapp} /> واتساب
</Button>
                  
                </div>
                    ))}
                  </Slider>
                </div>
                <Card.Body style={{ textAlign: "right" }}>
                  <Card.Title
                    style={{
                      color: "#123",
                      fontWeight: "700",
                      fontSize: "28px",
                    }}
                  >
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
                      <Col>{property.rooms}</Col>
                    </Row>
                    <Row>
                      <Col>{property.location}</Col>
                    </Row>
                  </Card.Text>
                
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={4} dir="rtl">
            <Link to="/findHomePage">
              <img src={imgCard} alt="imgCard" />
            </Link>

            <h4 className="my-3 h4">نتائج مقترحة</h4>
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
            </ListGroup>

            <h4 className="my-3 h4">روابط مفيدة</h4>
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
            </ListGroup>
          </Col>

        </Row>
      </Container>
      <Footer />
    </>
  );
}
