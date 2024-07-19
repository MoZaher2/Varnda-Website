import React from 'react';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faLinkedin, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer p-3">
      <Container>
        <Row className="d-flex justify-content-between align-items-center">

          <Col md={5} dir="rtl">
            <div className="footer-links mb-3">
              <Link to="/aboutUs" className="ms-3 fs-5 link">
                نبذه عنا
              </Link>
              <Link to="/contactUs" className="ms-3 fs-5 link">
                اتصل بنا
              </Link>
              <Link to="/terms" className="ms-3 fs-5 link">
                سياسة الخصوصية و الشروط
              </Link>
            </div>
            <h5>©varnda.com المنصة العقارية في مصر</h5>
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            <Link to="#" className="ms-2 fs-3 icon-social">
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
            <Link to="#" className="ms-2 fs-3 icon-social">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to="#" className="ms-2 fs-3 icon-social">
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
            <Link to="#" className="ms-2 fs-3 icon-social">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
          </Col>


        </Row>
        <div className="scroll-to-top">
          <button onClick={scrollToTop} className="btn btn-primary">
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </div>
      </Container>
    </div>
  );
}
