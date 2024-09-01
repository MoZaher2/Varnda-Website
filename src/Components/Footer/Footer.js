import React from 'react';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faLinkedin, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../images/footer-logo.webp';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer p-1">
      <Container>
        <div className='icon-div'>
          <p className='icon-text'>فارندا</p>
          <img src={logo} alt="footer-icon"  className='icon-img'/>
        </div>
        <Row className="d-flex justify-content-between align-items-center">
          <Col md={8} dir="rtl" className="footer-links mb-3">
            
              <Link to="/aboutUs" className="ms-3 fs-5 footer-link">
                نبذه عنا
              </Link>
              <Link to="/contactUs" className="ms-3 fs-5 footer-link">
                اتصل بنا
              </Link>
              <Link to="/terms" className="ms-3 fs-5 footer-link">
                سياسة الخصوصية و الشروط
              </Link>

          </Col>
          <Col md={4} className="d-flex justify-content-end">
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
          <h5>varnda.com© المنصة العقارية في مصر</h5>
        <div className="scroll-to-top">
          <button onClick={scrollToTop} className="btn btn-primary">
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </div>
      </Container>
    </div>
  );
}
