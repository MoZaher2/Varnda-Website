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
    faMapMarkerAlt,
    faRulerCombined
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {  Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Phone from "./Phone";
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function CardFav({ properties }) {
    console.log(properties);
    const token = Cookies.get("token")
    const settings = {
        dots: false,  
                   infinite: true, 
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // حركة تلقائية
        autoplaySpeed: 3500, // الوقت بين كل حركة تلقائية (بالملي ثانية)

    };
    const [favorites, setFavorites] = useState([]);
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setFavorites(properties.map(p => true))
        console.log(properties);
    }, [properties])


    const handleLove = async (id, index) => {
        setLoad(true)
        try {
            const response = await api.post("/flip-favorite", { ad_id: id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            window.location.reload();
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
    //اعرض جزء من الوصف 
    const renderLimitedText = (text, charLimit) => {
        if (text.length > charLimit) {
            return `${text.substring(0, charLimit)}....`;
        }
        return text;
    };
    return (
        <>
            {/* ال Card */}
            {properties.map((item, index) => (
                item.ad.ad_type === 0 ?
                    <Card className="d-flex flex-row mb-3 small position-relative" key={index}>
                        <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                            <Link to={`/moreDeteliesPage/${item.ad.id}`} className="link" key={index}>
                                {item.ad.property.images.length > 0 ? <Slider {...settings}>
                                    <div>
                                        <img
                                            src={item.ad.property.primary_picture}
                                            alt={`صوره الاعلان الرئيسيه`}
                                            key={index}
                                            style={{ width: "100%", height: "300px" }}
                                        />
                                    </div>
                                    {item.ad.property.images.map((image, idx) => (
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
                                        src={item.ad.property.primary_picture}
                                        alt={`صوره الاعلان الرئيسيه`}
                                        key={index}
                                        style={{ width: "100%", height: "300px" }}
                                    />
                                </div>}
                            </Link>
                            <h6 style={{ color: "#0d6efd" }} className="my-1">
                                الصور المتاحة لهذا العقار
                            </h6>
                            {/* وسائل التواصل */}
                            <div>
                                <a href={`tel:+2${item.ad.phone}`} >
                                    <Button variant="primary" className="m-2 btn-md">
                                        <FontAwesomeIcon icon={faPhone} /> اتصل
                                    </Button>
                                </a>
                                <Button
                                    variant="secondary"
                                    className="m-2 btn-md"
                                    onClick={() => {
                                        const mailtoLink = `mailto:${item.email}?subject=${encodeURIComponent('عقار على فارندا')}&body=${encodeURIComponent(`الرقم التعريفى للاعلان: ${item.id}`)}`;
                                        window.location.href = mailtoLink;
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                                </Button>
                                <a href={`https://api.whatsapp.com/send?phone=2${item.ad.whats_phone}&text=${encodeURIComponent("مرحباً، أنا مهتم بعقارك الموجود على فارندا")}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="success" className="m-2 btn-md">
                                        <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                            <Link to={`/moreDeteliesPage/${item.ad.id}`} className="link" key={index}>
                                <Card.Body style={{
                                    textAlign: 'right',
                                    height: '100%'
                                }}>
                                    <Card.Title
                                    >
                                        <span style={{
                                            color: "black",
                                            fontWeight: "bold",
                                            fontSize: "28px",
                                            marginLeft: "5px"
                                        }}>
                                            {Number(item.ad.property.price).toLocaleString('ar-EG')}
                                        </span>
                                        <span style={{
                                            color: "#123",
                                            fontSize: "18px",
                                        }}>
                                            ج.م
                                        </span>
                                    </Card.Title>
                                    <Card.Text style={{ padding: "0px" }}>
                                        <Row className="mb-2">
                                            <Col xs={4} style={{
                                                color: 'rgb(13, 110, 253)',
                                                display: 'flex',
                                                gap: '5px',
                                                alignItems: 'center'
                                            }}>
                                                <FontAwesomeIcon icon={faHome} style={{ marginLeft: "5px" }} />
                                                <span style={{
                                                    color: 'black'
                                                }}>
                                                    {item.ad.property["Sub Category"]}
                                                </span>
                                            </Col>
                                            <Col xs={4} style={{
                                                color: 'rgb(13, 110, 253)',
                                                display: 'flex',
                                                gap: '5px',
                                                alignItems: 'center'
                                            }}>
                                                <FontAwesomeIcon icon={faBed} style={{ marginLeft: "5px" }} />
                                                <span style={{
                                                    color: 'black'
                                                }}>
                                                    {item.ad.property.rooms}
                                                </span>
                                            </Col>
                                            <Col xs={4} style={{
                                                color: 'rgb(13, 110, 253)',
                                                display: 'flex',
                                                gap: '5px',
                                                alignItems: 'center'
                                            }}>
                                                <FontAwesomeIcon icon={faBath} style={{ marginLeft: "5px" }} />
                                                <span style={{
                                                    color: 'black'
                                                }}>
                                                    {item.ad.property.bathrooms}
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ color: "#868686" }}>
                                                <span style={{
                                                    color: 'rgb(13, 110, 253)',
                                                    fontSize: '18px',
                                                    marginLeft: '7px'
                                                }}>
                                                    <FontAwesomeIcon icon={faRulerCombined} style={{ marginLeft: "5px" }} />المساحة:
                                                </span>
                                                <span style={{
                                                    color: 'black',
                                                    fontSize: '24px',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {item.ad.property.area}
                                                </span>
                                                متر مربع
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ color: 'black' }} className="my-1">
                                                <h2>
                                                    {item.ad.property["Arabic Name"]}
                                                </h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <p style={{ color: '#898989' }}>
                                                {renderLimitedText(item.ad.property.details_ar, 150)}
                                            </p>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginLeft: "5px" }} />
                                                <span style={{
                                                    color: 'black',
                                                }}>
                                                    {item.ad.property.full_address}
                                                </span>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </div>

                        {/* Love button */}
                        <IconButton loading={load} onClick={() => handleLove(item.ad.id, index)} color="danger" size="lg" sx={{
                            mr: 'auto', position: 'absolute',
                            bottom: '10px',
                            left: '10px'
                        }}>
                            {favorites[index] ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    </Card>
                    :  // Quick Ads
                    <Card
                      className="d-flex flex-row mb-3 small position-relative"
                      key={index}
                    >
                      <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                        <Link
                          to={`/moreDeteliesPage/${item.ad.id}`}
                          className="link"
                          key={index}
                        >
                          {item.ad.property.images.length > 1 ? (
                            <Slider {...settings}>
                              {item.ad.property.images.map((image, idx) => (
                                <div>
                                  <img
                                    src={image.image}
                                    alt={`imgCard-${idx}`}
                                    key={idx}
                                    style={{ width: "100%", height: "300px" }}
                                  />
                                </div>
                              ))}
                            </Slider>
                          ) : (
                            <div>
                              <img
                                src={item.ad.property.images[0].image}
                                alt={`صوره الاعلان`}
                                key={index}
                                style={{ width: "100%", height: "300px" }}
                              />
                            </div>
                          )}
                        </Link>
                        <div>
                          <a href={`tel:+2${item.ad.phone}`}>
                            <Button variant="primary" className="m-2 btn-md">
                              <FontAwesomeIcon icon={faPhone} /> اتصل
                            </Button>
                          </a>
                          <a
                            href={`https://api.whatsapp.com/send?phone=2${
                                item.ad.whats_phone
                            }&text=${encodeURIComponent(
                              "مرحباً، أنا مهتم بعقارك الموجود على فارندا"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="success" className="m-2 btn-md">
                              <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                            </Button>
                          </a>
                        </div>
                      </div>
                      <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                        <Link
                          to={`/moreDeteliesPage/${item.ad.id}`}
                          className="link"
                          key={index}
                        >
                          <Card.Body
                            style={{
                              textAlign: "right",
                              height: "100%",
                            }}
                          >
                            <Card.Text style={{ padding: "0px" }}>
                              <Row>
                                <p style={{ color: "#898989" }}>
                                  {renderLimitedText(item.ad.property.details_ar, 450)}
                                </p>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                        </Link>
                      </div>
                      {/* Love button */}
                      <IconButton
                        loading={load}
                        onClick={() => handleLove(item.ad.id, index)}
                        color="danger"
                        size="lg"
                        sx={{
                          mr: "auto",
                          position: "absolute",
                          bottom: "10px",
                          left: "10px",
                        }}
                      >
                        {favorites[index] ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </Card>
            ))}
        </>
    );
}