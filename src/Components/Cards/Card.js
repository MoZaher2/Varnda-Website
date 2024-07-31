import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Card.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBed,
    faBath,
    faEnvelope,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
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
import Phone from "./Phone";



export default function PropertyCard() {
    const properties1 = [
        {
            property_id: 10,
            phone: "01005138370",
            "Category": "Residential",
            whats_phone: "01005138370",
            price: "23,503,500 ج.م",
            type: "هاوس",
            beds: 4,
            baths: 4,
            area: "216 متر مربع",
            description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            rooms: "4 غرف 03500...",
            location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            images: [card1, card2, card3],
        },
        // {
        //     price: "23,503,500 ج.م",
        //     type: "هاوس",
        //     beds: 4,
        //     baths: 4,
        //     area: "216 متر مربع",
        //     description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
        //     rooms: "4 غرف 03500...",
        //     location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
        //     images: [card4, card5, card6],
        // },
        // {
        //     price: "23,503,500 ج.م",
        //     type: "هاوس",
        //     beds: 4,
        //     baths: 4,
        //     area: "216 متر مربع",
        //     description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
        //     rooms: "4 غرف 03500...",
        //     location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
        //     images: [card7, card8, card9],
        // },
        // {
        //     price: "23,503,500 ج.م",
        //     type: "هاوس",
        //     beds: 4,
        //     baths: 4,
        //     area: "216 متر مربع",
        //     description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
        //     rooms: "4 غرف 03500...",
        //     location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
        //     images: [card10, card11, card12],
        // },
    ];

    const properties = [
        {
            "phone": "201005138370",
            "whats_phone": "01005138370",
            "id": 1,
            "property_id": 3,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 3,
                "primary_picture": "https://images.unsplash.com/photo-1722232778560-a56742074a31?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "images": [
                {
                    "image": "https://images.unsplash.com/photo-1722232778560-a56742074a31?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                },
                {
                    "image": "https://images.unsplash.com/photo-1722232778560-a56742074a31?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                },
                {
                    "image": "https://images.unsplash.com/photo-1722232778560-a56742074a31?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
            ],
                "Arabic Name": "فيلا فاخرة",
                "English Name": null,
                "Type": "sale",
                "Category": "Resiial",
                "Sub Category": "Villa",
                "User_id": null,
                "Company_id": null,
                "governorate": "Cairo",
                "city": "Giza",
                "region": "6th October",
                "street": "El Haram Street",
                "full_address": "123 El Haram Street, Giza, Egypt",
                "details_ar": "فيلا فاخرة مع حديقة وحمام سباحة",
                "details_en": null,
                "video_link": "https://example.com/video-link",
                "phone": null,
                "view": "Garden View",
                "price": "1500000.00",
                "area": 350,
                "payment_method": "Cash",
                "rooms": 5,
                "bathrooms": 3,
                "finishing_type": "Luxury",
                "floors": 2,
                "Furnished": 1,
                "compound_name": "Green Valley Compound",
                "latitude": "30.04442000",
                "longitude": "31.23571200",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": null,
                "Discount": 10,
                "floor_number": 1,
                "deliver_date": "2022-01-01",
                "legal_papers": "Title Deed",
                "department": "commercial",
                "facilities": {
                    "Gym": true,
                    "Parking": true,
                    "Swimming Pool": true
                },
                "features": {
                    "Central Heating": true,
                    "Air Conditioning": true
                },
                "services": {
                    "Security": true,
                    "Cleaning Service": true
                },
                "devices": {
                    "Microwave": true,
                    "Washing Machine": true
                },
                "accessories": {
                    "Balcony": true,
                    "Storage Room": true
                },
                "price_per": "month"
            }
        },
    ]

    const settings = {
        // dots: false,
        // infinite: true,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // حركة تلقائية
        autoplaySpeed: 3500, // الوقت بين كل حركة تلقائية (بالملي ثانية)
        // arrows: true, // تفعيل الأسهم الجانبية
    };
    //WhatsApp 
    const phoneNumber = "201118936185"; // استبدل هذا بالرقم الذي تريد مراسلته
    const message = "مرحباً، أنا مهتم بعقارك الموجود على فارندا"; // الرسالة التي تريد إرسالها
    const url = `https://api.whatsapp.com/send?phone="201118936185"&text=${encodeURIComponent("مرحباً، أنا مهتم بعقارك الموجود على فارندا")}`;
    //Email
    // const emailAddress = "www.mohamedzaher19@gmail.com"; // استبدل هذا بعنوان البريد الإلكتروني الذي تريد إرسال الرسالة إليه
    // const subject = "About Varnda"; // موضوع البريد الإلكتروني
    // const body = encodeURIComponent(message); // محتوى البريد الإلكتروني

    // const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // // فتح عميل البريد الإلكتروني مع النص
    // window.open(mailtoLink, '_blank');

    return (
        <>
            {/* ال Card */}
            {properties.map((property, index) => (

                <Card className="d-flex flex-row mb-3 small">
                    <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                        <Link to={`/moreDeteliesPage/${property.property_id}`} className="link" key={index}>
                            <Slider {...settings}>
                                <div>
                                    <img
                                        src={property.property.primary_picture}
                                        alt={`صوره الاعلان الرئيسيه`}
                                        key={index}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                                {property.property.images.map((image, idx) => (
                                    <div>
                                        <img
                                            src={image.image}
                                            alt={`imgCard-${idx}`}
                                            key={idx}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </Link>
                        <h6 style={{ color: "#0d6efd" }} className="my-3">
                            الصور المتاحة لهذا العقار
                        </h6>
                        <div>
                            <Phone phone={property.phone} />
                            <Button variant="secondary" className="m-2 btn-sm">
                                <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                            </Button>
                            <a href={`https://api.whatsapp.com/send?phone=2${property.whats_phone}&text=${encodeURIComponent("مرحباً، أنا مهتم بعقارك الموجود على فارندا")}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="success" className="m-2 btn-sm">
                                    <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                        <Link to={`/moreDeteliesPage/${property.property_id}`} className="link" key={index}>
                            <Card.Body style={{
                                textAlign: 'right',
                                // display: 'flex',
                                // flexDirection: 'column',
                                // justifyContent: 'space-between',
                                height: '100%'
                            }}>
                                <Card.Title
                                    style={{
                                        color: "#123",
                                        fontWeight: "700",
                                        fontSize: "28px",
                                    }}
                                >
                                    {property.property.price} ج.م
                                </Card.Title>
                                <Card.Text style={{ padding: "0px" }}>
                                    <Row className="mb-2">
                                        <Col xs={4} style={{
                                            color: 'rgb(13, 110, 253)',
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center'
                                        }}>
                                            <FontAwesomeIcon icon={faHome} style={{ marginLeft: "5px" }} /> {property.property.Category}
                                        </Col>
                                        <Col xs={4} style={{
                                            color: 'rgb(13, 110, 253)',
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center'
                                        }}>
                                            <FontAwesomeIcon icon={faBed} style={{ marginLeft: "5px" }} /> {property.property.rooms}
                                        </Col>
                                        <Col xs={4} style={{
                                            color: 'rgb(13, 110, 253)',
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
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
                </Card>
            ))}
        </>
    );
}
