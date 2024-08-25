import React, { useState } from "react";
import "./FindHomePage.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeaderSearch from "../../Components/HeaderSearch/HeaderSearch";
export default function FindHomePage() {
  return (
    <>
      <Header />
      <HeaderSearch />
      <Row className="mb-3 AreaCard">
        <Col>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1800612.7892897576!2d31.841395786137394!3d28.182332788875105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1444c357043f1853%3A0xe64e2c0c449c8b68!2z2YXYrdin2YHYuNipINin2YTZhdmG2YrYpw!5e0!3m2!1sar!2seg!4v1719750885798!5m2!1sar!2seg"
            width="100%"
            height="450"
          ></iframe>
        </Col>
        <Col>
          <Link to="/search" className="link-back">الرجوع إلى البحث العادى </Link>
          <div className="text-center mt-5 parent-data-search" dir="rtl"> 
            <h2>الإقامة بالقرب من الأماكن المهمة بالنسبة لك</h2>
            <h6>كل ما عليك فعله هو إخبارنا:</h6>
            <p>المكان الذي ترغب في أن تكون بقربه</p>
            <p>ميزانيتك ومعايير العقار الأخرى</p>
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}
