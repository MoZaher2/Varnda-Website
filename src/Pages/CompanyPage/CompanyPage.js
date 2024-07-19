import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./CompanyPage.css";
import Company from "../../Components/Company/Company";

export default function CompanyPage() {

  return (
    <>
      <Header />
      <Container dir="rtl">
        <Form className="w-100">
          <Row className="my-3">
            <Form.Group as={Col} xs={12} lg={5}>
              <Form.Control type="text" placeholder="أدخل الموقع " />
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={5}>
              <Form.Control type="text" placeholder="اسم الوكالة  " />
            </Form.Group>

            <Form.Group as={Col} xs={12} lg={2}>
              <Button variant="primary" className="w-100">
                ابحث
              </Button>
            </Form.Group>
          </Row>
        </Form>

  
<Company />



      </Container>
      <Footer />
    </>
  );
}
