import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./Card.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from '@mui/joy';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {
    faBed,
    faBath,
    faEnvelope,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, Dropdown, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSearchAdvanced from "../HeaderSearchAdvanced/HeaderSearchAdvanced";
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
// import Phone from "./Phone";
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';

import { faPhone } from "@fortawesome/free-solid-svg-icons";


export default function PropertyCard({ properties }) {
    const token = Cookies.get("token")
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // حركة تلقائية
        autoplaySpeed: 3500, // الوقت بين كل حركة تلقائية (بالملي ثانية)
        // arrows: true, // تفعيل الأسهم الجانبية
    };
    const [favorites, setFavorites] = useState([]);
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setFavorites(properties.map(p => p.is_favorite))
    }, [properties])

    const handleLove = async (ad_id, index) => {
        setLoad(true)
        try {
            const response = await api.post("/flip-favorite", { ad_id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const newFavorites = [...favorites];
            newFavorites[index] = !newFavorites[index];
            setFavorites(newFavorites);

        } catch (err) {
            console.log(err);
        }
        finally {
            setLoad(false)
        }
    }
    if (properties.length === 0) {
        return (<Alert key="warning" className="text-center" variant="warning">
            لا يوجد اعلانات
        </Alert>)
    }
    return (
        <>
            {/* ال Card */}
            
            {properties.map((property, index) => (
                
                <Card className="d-flex flex-row mb-3 small position-relative" key={index}>
                    <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                        <Link to={`/moreDeteliesPage/${property.property_id}`} className="link" key={index}>
                            {property.property.images.length > 0 ? <Slider {...settings}>
                                <div>
                                    <img
                                        src={property.property.primary_picture}
                                        alt={`صوره الاعلان الرئيسيه`}
                                        key={index}
                                        style={{ width: "100%", height: "300px" }}
                                    />
                                </div>
                                {property.property.images.map((image, idx) => (
                                    <div>
                                        <img
                                            src={image.image}
                                            alt={`imgCard-${idx}`}
                                            key={idx}
                                            style={{ width: "100%", height: "300px" }}
                                        />
                                    </div>
                                ))}
                            </Slider> : <div>
                                <img
                                    src={property.property.primary_picture}
                                    alt={`صوره الاعلان الرئيسيه`}
                                    key={index}
                                    style={{ width: "100%", height: "300px" }}
                                />
                            </div>}
                        </Link>
                        <h6 style={{ color: "#0d6efd" }} className="my-3">
                            الصور المتاحة لهذا العقار
                        </h6>
                        <div>
                            <a href={`tel:+2${property.phone}`} >
                                <Button variant="primary" className="m-2 btn-md">
                                    <FontAwesomeIcon icon={faPhone} /> اتصل
                                </Button>
                            </a>
                            <Button
                                variant="secondary"
                                className="m-2 btn-md"
                                onClick={() => {
                                    const mailtoLink = `mailto:${property.email}?subject=${encodeURIComponent('عقار على فارندا')}&body=${encodeURIComponent(`الرقم التعريفى للاعلان: ${property.id}`)}`;
                                    window.location.href = mailtoLink;
                                }}
                            >
                                <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                            </Button>
                            <a href={`https://api.whatsapp.com/send?phone=2${property.whats_phone}&text=${encodeURIComponent("مرحباً، أنا مهتم بعقارك الموجود على فارندا")}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="success" className="m-2 btn-md">
                                    <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                                </Button>
                            </a>

                        </div>
                    </div>
                    <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                        <Link to={`/moreDeteliesPage/${property.property_id}`} className="link" key={index}>
                            <Card.Body style={{
                                textAlign: 'right',
                                height: '100%'
                            }}>
                                <Card.Title
                                    style={{
                                        color: "#123",
                                        fontWeight: "700",
                                        fontSize: "28px",
                                    }}
                                >
                                    {Number(property.property.price).toLocaleString('ar-EG')} ج.م
                                </Card.Title>
                                <Card.Text style={{ padding: "0px" }}>
                                    <Row className="mb-2">
                                        <Col xs={4} style={{
                                            color: 'rgb(13, 110, 253)',
                                            display: 'flex',
                                            gap: '5px',
                                            alignItems: 'center'
                                        }}>
                                            <FontAwesomeIcon icon={faHome} style={{ marginLeft: "5px" }} /> {property.property.Category}
                                        </Col>
                                        <Col xs={4} style={{
                                            color: 'rgb(13, 110, 253)',
                                            display: 'flex',
                                            gap: '5px',
                                            alignItems: 'center'
                                        }}>
                                            <FontAwesomeIcon icon={faBed} style={{ marginLeft: "5px" }} /> {property.property.rooms}
                                        </Col>
                                        <Col xs={4} style={{
                                            color: 'rgb(13, 110, 253)',
                                            display: 'flex',
                                            gap: '5px',
                                            alignItems: 'center'
                                        }}>
                                            <FontAwesomeIcon icon={faBath} style={{ marginLeft: "5px" }} /> {property.property.bathrooms}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ color: "#868686" }}>
                                            المساحة: {property.property.area} متر مربع
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col style={{ color: 'black' }} className="my-2">
                                            <h2>
                                                {property.property["Arabic Name"]}
                                            </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>{property.property.full_address}</Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Link>
                    </div>

                    {/* Love button */}
                    <IconButton loading={load} onClick={() => handleLove(property.id, index)} color="danger" size="lg" sx={{
                        mr: 'auto', position: 'absolute',
                        bottom: '10px',
                        left: '10px'
                    }}>
                        {favorites[index] ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Card>
            ))}
        </>
    );
}
