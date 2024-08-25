import React, { useEffect, useState } from 'react';
import './FavPage.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faBath,
  faPhone,
  faEnvelope,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import CardFav from '../../Components/Cards/CardFav.js';

export default function FavPage() {
const token=Cookies.get("token")
  const[properties,setProperties]=useState([])
  const[overlay,setOverlay]=useState(false)
  useEffect(() => {
    const fetchFavAds=async()=>{
      try {
        setOverlay(true);
        const response = await api.get("/get-favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setOverlay(false);
      }
    }
    fetchFavAds()
  }, [])
  return (
    <>
      <Header />
      <h2 className="text-center mt-3 mb-4" style={{ color: 'blue' }}>
        الاعلانات المفضلة
      </h2>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col dir="rtl" sm={12} md={10} lg={8}>
          <CardFav properties={properties} overlay={overlay}/> 
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
