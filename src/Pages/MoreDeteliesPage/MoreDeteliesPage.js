import React from "react";
import Slider from "react-slick";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container, Row, Col, Card } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MoreDeteliesPage.css";
import card1 from "../../images/card_1.png";
import card2 from "../../images/card_2.png";
import card3 from "../../images/card_3.png";
import card4 from "../../images/card_4.png";

const propertyDetails = {
  price: "6,500,000 ج.م",
  location: "الحي اللاتيني، الساحل الشمالي، مطروح",
  beds: 3,
  baths: 3,
  area: "160 متر مربع",
  description:
    "شقة للبيع في أرقى قرى الحي اللاتيني بالعلمين الجديدة، فقط بمقدم 650 ألف والباقي بالتقسيط على 8 سنوات بدون فوائد. استلم شقتك، كاملة التشطيب، وبإطلالة بحرية ساحرة.",
  images: [card1, card2, card3, card4],
  space: "160 متر",
  bedrooms: "3 غرف نوم واسعة",
  bathrooms: "3 حمامات",
  paymentPlan: {
    downPayment: "مقدم 650,000 جنيه",
    installmentPlan: "باقي المبلغ بالتقسيط المريح على 7 سنوات",
  },
  contactInfo: "عرض معلومات الاتصال (موبايل + واتساب)",
  nearby: [
    { name: "مستشفى ABC", type: "مستشفى", distance: "1 كم", image: card1 },
    { name: "مطعم XYZ", type: "مطعم", distance: "500 م", image: card2 },
    { name: "مدرسة DEF", type: "مدرسة", distance: "2 كم", image: card3 },
    { name: "سوبر ماركت GHI", type: "سوبر ماركت", distance: "300 م", image: card4 },
  ],
  advantages: ["إطلالة بحرية ساحرة", "كاملة التشطيب","إطلالة بحرية ساحرة", "كاملة التشطيب"],
  disadvantages: ["لا يوجد مصعد", "بعيدة عن وسط المدينة", "بعيدة عن وسط المدينة"],
};

const MoreDeteliesPage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Header />
      <div className="details-container mt-5" dir="rtl">
        <Container>
          <Row className="mb-4">
            <Col xs={12} lg={6}>
              <Slider {...sliderSettings}>
                {propertyDetails.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index}`}
                      className="img-fluid w-100"
                    />
                  </div>
                ))}
              </Slider>

              <h3 className="mb-3" style={{color: "#0d6efd"}} >المزايا: </h3>
              <ul className="list-group mb-3">
                {propertyDetails.advantages.map((advantage, index) => (
                  <li key={index} className="list-group-item">
                    {advantage}
                  </li>
                ))}
              </ul>

              <h3 className="mb-3" style={{color: "#0d6efd"}}>العيوب:</h3>
              <ul className="list-group mb-3">
                {propertyDetails.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="list-group-item">
                    {disadvantage}
                  </li>
                ))}
              </ul>
            </Col>
            <Col xs={12} lg={6} className="details">
              <h1 className="mb-3" style={{color: "#0d6efd"}}>{propertyDetails.price}</h1>
              <p className="mb-4" style={{color: "#123",fontWeight:"700"}}>{propertyDetails.location}</p>
              <Row className="mb-3">
                <Col xs={6}>
                  <p style={{color: "#888",fontWeight:"700"}}>المساحة:</p>
                </Col>
                <Col xs={6}>
                  <p style={{color: "#0d6efd",fontWeight:"700"}}>{propertyDetails.space}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                  <p style={{color: "#888",fontWeight:"700"}}>الغرف:</p>
                </Col>
                <Col xs={6}>
                  <p style={{color: "#0d6efd",fontWeight:"700"}}>{propertyDetails.beds}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                  <p style={{color: "#888",fontWeight:"700"}}>الحمامات:</p>
                </Col>
                <Col xs={6}>
                  <p style={{color: "#0d6efd",fontWeight:"700"}}>{propertyDetails.baths}</p>
                </Col>
              </Row>
              <p className="mb-4" style={{color: "#123",fontWeight:"700"}}>{propertyDetails.description}</p>
              <h3 className="mb-3" style={{color: "#0d6efd"}}>تفاصيل الشقة:</h3>
              <p style={{color: "#888",fontWeight:"700"}}>المساحة: {propertyDetails.space}</p>
              <p style={{color: "#888",fontWeight:"700"}}>الغرف: {propertyDetails.bedrooms}</p>
              <p style={{color: "#888",fontWeight:"700"}}>الحمامات: {propertyDetails.bathrooms}</p>
              <h3 className="mb-3" style={{color: "#0d6efd"}}>نظام الدفع:</h3>
              <p style={{color: "#888",fontWeight:"700"}}>{propertyDetails.paymentPlan.downPayment}</p>
              <p style={{color: "#888",fontWeight:"700"}}>{propertyDetails.paymentPlan.installmentPlan}</p>
              <p style={{color: "#888",fontWeight:"700"}}>{propertyDetails.contactInfo}</p>
            </Col>
          </Row>

          <h3 className="mb-5" style={{color: "#0d6efd"}}>الأماكن المجاورة:</h3>
          <Row>
  {propertyDetails.nearby.map((place, index) => (
    <Col xs={12} md={6} lg={3} key={index}>
      <Card className="mb-3">
        <Card.Img variant="top" src={place.image} alt={place.name} />
        <Card.Body>
          <Card.Title>{place.name}</Card.Title>
          <Card.Text>
             {place.type}
            <br />
            المسافة: {place.distance}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

        </Container>
      </div>
      <Footer />
    </>
  );
};

export default MoreDeteliesPage;
