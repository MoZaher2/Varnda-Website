import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import img1 from '../../images/advice_6.png';
import img2 from '../../images/advice_8.png';
import img3 from '../../images/mm3.png';
import img4 from '../../images/advice_4.png';
import img5 from '../../images/advice_5.png';
import img6 from '../../images/advice_6.png';
const articlesData = [
  {
    id: 1,
    img: img1,
    title: 'كيفية تحويل بيتك إلى ملاذ الفنج شوي ',
    readTime: '3 دقائق للقراءة ',
    description:
      'هل تجد نفسك تحدق في الدهان المتقشر على جدرانك، وتتساءل عن كيفية استعادة مظهرها الذي كان أصليًا في السابق؟ لا ينتقص الدهان المتقشر من جمال منزلك فحسب، بل …',
  },
  {
    id: 2,
    img: img2,
    title: 'كيف تستعد لمقابلة مصمم الديكور الداخلي الخاص بك للمرة الأولى؟',
    readTime: '3 دقائق للقراءة ',
    description:
      'هل تجد نفسك تحدق في الدهان المتقشر على جدرانك، وتتساءل عن كيفية استعادة مظهرها الذي كان أصليًا في السابق؟ لا ينتقص الدهان المتقشر من جمال منزلك فحسب، بل …',
  },
  {
    id: 3,
    img: img3,
    title: ' أثاث حديقة المنزل الخلفية: اختيار الخامات المناسبة لها',
    readTime: '3 دقائق للقراءة ',
    description:
      'هل تجد نفسك تحدق في الدهان المتقشر على جدرانك، وتتساءل عن كيفية استعادة مظهرها الذي كان أصليًا في السابق؟ لا ينتقص الدهان المتقشر من جمال منزلك فحسب، بل …',
  },
  {
    id: 4,
    img: img4,
    title: 'كيفية إصلاح تقشر الدهان في المنزل',
    readTime: '3 دقائق للقراءة ',
    description:
      'هل تجد نفسك تحدق في الدهان المتقشر على جدرانك، وتتساءل عن كيفية استعادة مظهرها الذي كان أصليًا في السابق؟ لا ينتقص الدهان المتقشر من جمال منزلك فحسب، بل …',
  },
  {
    id: 5,
    img: img5,
    title: 'دمج التكنولوجيا الذكية في منزلك الجديد',
    readTime: '3 دقائق للقراءة ',
    description:
      'هل تجد نفسك تحدق في الدهان المتقشر على جدرانك، وتتساءل عن كيفية استعادة مظهرها الذي كان أصليًا في السابق؟ لا ينتقص الدهان المتقشر من جمال منزلك فحسب، بل …',
  },
  {
    id: 6,
    img: img6,
    title: 'الاختيار بين حفل زفاف في الصيف وفي الشتاء',
    readTime: '3 دقائق للقراءة ',
    description:
      'هل تجد نفسك تحدق في الدهان المتقشر على جدرانك، وتتساءل عن كيفية استعادة مظهرها الذي كان أصليًا في السابق؟ لا ينتقص الدهان المتقشر من جمال منزلك فحسب، بل …',
  },
];

export default function SectionCards({ images }) {
  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Col md={3} dir="rtl">
          <div className="d-flex flex-wrap">
            {images.map((img, index) => (
              <div key={index} style={{ width: '33.33%', padding: '5px' }}>
                <Link to="#">
                  <img
                    src={img}
                    alt=""
                    className="img-fluid"
                    style={{ marginBottom: '10px' }}
                  />
                </Link>
              </div>
            ))}
          </div>
          <Link
            to="#"
            className="fs-5 icon-social link btn btn-outline-primary d-block text-center"
          >
            <FontAwesomeIcon icon={faInstagram} /> تابعونا
          </Link>
        </Col>

        <Col md={9} dir="rtl">
          <Row>
            {articlesData.map((article, index) => (
              <Col key={index} md={6} className="mb-4">
                <div className="card-container" style={{ width: '100%' }}>
                  <div className="card-left">
                    <img src={article.img} alt="" />
                    <h3 className="text-center my-3">{article.title}</h3>
                    <div className="d-flex align-items-center justify-content-between">
                      <Link to={`/DetailesPage/${article.id}`} className="mb-3">
                        نصائح
                      </Link>
                      <p style={{ fontWeight: '700', color: '#0d6efd' }}>
                        {article.readTime}
                      </p>
                    </div>
                    <p style={{ fontWeight: '600', color: '#888' }}>
                      {article.description}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
