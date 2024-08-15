import Slider from "react-slick";
import { Container, Row, Col, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone ,faEnvelope } from "@fortawesome/free-solid-svg-icons";

const QuickCardDetails = ({ propertyDetails }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
        autoplaySpeed: 3500,
  };

  return (
    <>
      <div className="details-container mt-5" dir="rtl">
        <Container>
          <Row className="mb-4">
            <Col xs={12} lg={6} style={{ position: "relative" }}>
              {propertyDetails.property.images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {propertyDetails.property.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.image}
                        alt={`Slide ${index}`}
                        className="img-fluid w-100"
                        style={{ width: "100%", height: "400px" }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div key={100}>
                  <img
                    src={propertyDetails.property.images[0].image}
                    alt={`صور الاعلان `}
                    className="img-fluid w-100"
                    style={{ width: "100%", height: "400px" }}
                  />
                </div>
              )}
            </Col>
            <Col xs={12} lg={6} className="details">
              <Row className="mb-3">
                <p
                  className="mb-4"
                  style={{ color: "#123", fontWeight: "700" }}
                >
                  {propertyDetails.property.details_ar}
                </p>
              </Row>
              <h3 className="mb-2" style={{ color: "#0d6efd" }}>
                تواصل مع صاحب الاعلان:
              </h3>
              <Row>
                <div>
                  <a href={`tel:+2${propertyDetails.phone}`}>
                    <Button variant="primary" className="m-2 btn-lg">
                      <FontAwesomeIcon icon={faPhone} /> اتصل
                    </Button>
                  </a>
                  <Button
                      variant="secondary"
                      className="m-2 btn-lg"
                      onClick={() => {
                        const mailtoLink = `mailto:${
                          propertyDetails.email
                        }?subject=${encodeURIComponent(
                          "عقار على فارندا"
                        )}&body=${encodeURIComponent(
                          `الرقم التعريفى للاعلان: ${propertyDetails.id}`
                        )}`;
                        window.location.href = mailtoLink;
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                    </Button>
                  <a
                    href={`https://api.whatsapp.com/send?phone=2${
                      propertyDetails.whats_phone
                    }&text=${encodeURIComponent(
                      "مرحباً، أنا مهتم بعقارك الموجود على فارندا.: "
                    )}${encodeURIComponent(
                      `http://varnda.com/moreDeteliesPage/${propertyDetails.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="success" className="m-2 btn-lg">
                      <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                    </Button>
                  </a>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default QuickCardDetails;
