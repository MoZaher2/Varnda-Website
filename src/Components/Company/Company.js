import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "./Company.css";
import img15 from "../../images/15.jpeg";
import img16 from "../../images/16.webp";
import img17 from "../../images/17.jpeg";
import img18 from "../../images/18.jpeg";
import img19 from "../../images/19.jpeg";
import img20 from "../../images/20.jpeg";
import imgcompany1 from "../../images/com1_new.webp";
import imgcompany2 from "../../images/com2_new.webp";
import imgcompany3 from "../../images/com3_new.webp";
import imgcompany4 from "../../images/com4_new.webp";
import imgcompany5 from "../../images/com5_new.webp";
import imgcompany6 from "../../images/com6_new.webp";
import imgcompany7 from "../../images/com7_new.webp";
import imgcompany8 from "../../images/com8_new.webp";
import { Container } from "react-bootstrap";
export default function Company() {



  return (
    <Container>
              <h2 className="company-h2 mt-4 mb-3">
  تصفح المدن والمناطق العقارية فى مصر 
        </h2>
        <p className="company-p">
          مشاهدة الوكالات العقارية التي تعمل في إمارة أو منطقة معينة فقط
        </p>

        <Row className="my-3">
          <Col>
            <Card>
              <Card.Img variant="top" src={imgcompany1} />
              <Card.Body>
                <Card.Title>القاهرة الجديدة</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src={imgcompany2} />
              <Card.Body>
                <Card.Title>الشيخ زايد </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card>
              <Card.Img variant="top" src={imgcompany3} />
              <Card.Body>
                <Card.Title>مصر الجديدة </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card>
              <Card.Img variant="top" src={imgcompany4} />
              <Card.Body>
                <Card.Title>مدينة نصر </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Card>
              <Card.Img variant="top" src={imgcompany5} />
              <Card.Body>
                <Card.Title> 6 أكتوبر</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src={imgcompany6} />
              <Card.Body>
                <Card.Title> المعادى </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card>
              <Card.Img variant="top" src={imgcompany7} />
              <Card.Body>
                <Card.Title>مدينتى  </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card>
              <Card.Img variant="top" src={imgcompany8} />
              <Card.Body>
                <Card.Title> سموحة </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
  )
}
