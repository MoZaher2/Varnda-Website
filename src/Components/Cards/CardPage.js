import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./Card.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from '@mui/joy';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    faBed,
    faBath,
    faEnvelope,
    faHome,
    faRulerCombined,
    faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function CardPage({ properties=[] ,loading}) {
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
    const [loadId, setLoadId] = useState(null)

    useEffect(() => {
      if(properties.length){
        setFavorites(properties.map(p => p.is_favorite))
      }
    }, [properties])

    const handleLove = async (ad_id, index) => {
        setLoadId(ad_id)
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
            setLoadId(null)
        }
    }
    if (properties.length === 0) {
      return (
        <>
          {loading ? (
            // Skeleton عند تحميل البيانات
            Array(3)
              .fill(0)
              .map((_, index) => (
                <Card className="d-flex flex-row mb-3 small" key={index}>
                  <div style={{ width: "50%", height: "auto" }}>
                    <Skeleton height={300} />
                  </div>
                  <div
                    style={{ width: "50%", height: "auto", padding: "15px" }}
                  >
                    <Skeleton count={5} />
                  </div>
                </Card>
              ))
          ) : (
            <Alert key="warning" className="text-center" variant="warning">
              لا يوجد اعلانات
            </Alert>
          )}
        </>
      );
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
        {loading ? (
                // Skeleton عند تحميل البيانات
                Array(3).fill(0).map((_, index) => (
                    <Card className="d-flex flex-row mb-3 small" key={index}>
                        <div style={{ width: "50%", height: "auto" }}>
                            <Skeleton height={300} />
                        </div>
                        <div style={{ width: "50%", height: "auto", padding: "15px" }}>
                            <Skeleton count={5} />
                        </div>
                    </Card>
                ))
            ) : (
         <>
         
         <Row className="justify-content-center">

            {properties.map((property, index) =>
              // Normal Ads
              property.ad_type === 0 ? (
               <Card as={Col} xs={11} sm={10} md={5} lg={3} className="position-relative mb-4 mx-3" key={index}>
                 <div className="imgCont" style={{ height: "auto" }} >
                   <Link to={`/property/${property.slug}`} className="link">
                     {property.property.images.length > 0 ? (
                       <Slider {...settings}>
                         <div key="primary-image">
                           <img
                             src={property.property.primary_picture}
                             alt="صوره الاعلان الرئيسيه"
                             style={{ width: "100%", height: "200px" }}
                           />
                         </div>
                         {property.property.images.map((image, idx) => (
                           <div key={`image-${idx}`}>
                             <img
                               src={image.image}
                               alt={`imgCard-${idx}`}
                               style={{ width: "100%", height: "200px" }}
                             />
                           </div>
                         ))}
                       </Slider>
                     ) : (
                        <div>
                          <img
                            src={property.property.primary_picture}
                            alt={`صوره الاعلان الرئيسيه`}
                            key={index}
                            style={{ width: "100%", height: "200px" }}
                          />
                        </div>
                      )}
                    </Link>
                    <div>
                      <a href={`tel:+2${property.phone}`}>
                        <Button variant="primary" className="m-2 btn-md">
                          <FontAwesomeIcon icon={faPhone} /> اتصل
                        </Button>
                      </a>
                      <Button
                        variant="secondary"
                        className="m-2 btn-md"
                        onClick={() => {
                          const mailtoLink = `mailto:${
                            property.email
                          }?subject=${encodeURIComponent(
                            "عقار على فارندا"
                          )}&body=${encodeURIComponent(
                            `الرقم التعريفى للاعلان: ${property.id}`
                          )}`;
                          window.location.href = mailtoLink;
                        }}
                      >
                        <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                      </Button>
                      <a
                        href={`https://api.whatsapp.com/send?phone=2${
                          property.whats_phone
                        }&text=${encodeURIComponent(
                          "مرحباً، أنا مهتم بعقارك الموجود على فارندا.: "
                        )}${encodeURIComponent(
                          `http://varnda.com/property/${property.slug}`
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
                  <div className="imgCont" style={{ height: "auto" }}>
                    <Link to={`/property/${property.slug}`} className="link" key={index}>
                      <Card.Body
                        style={{
                          textAlign: "right",
                          height: "100%",
                          marginTop:'0px',
                          marginBottom:'0px'
                        }}
                      >
                        <Card.Title
                          style={{
                            color: "#123",
                            fontWeight: "700",
                            fontSize: "28px",
                          }}
                        >
                          <span
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "28px",
                              marginLeft: "5px",
                            }}
                          >
                            {Number(property.property.price).toLocaleString(
                              "ar-EG"
                            )}
                          </span>
                          <span
                            style={{
                              color: "#123",
                              fontSize: "18px",
                            }}
                          >
                            ج.م
                          </span>
                        </Card.Title>
                        <Card.Text style={{ padding: "0px" }}>
                          <Row className="mb-1">
                            <Col
                              xs={4}
                              style={{
                                color: "rgb(13, 110, 253)",
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faHome}
                                style={{ marginLeft: "5px" }}
                              />
                              <span
                                style={{
                                  color: "black",
                                }}
                              >
                                {property.property["Sub Category"]}
                              </span>
                            </Col>
                            <Col
                              xs={4}
                              style={{
                                color: "rgb(13, 110, 253)",
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faBed}
                                style={{ marginLeft: "5px" }}
                              />
                              <span
                                style={{
                                  color: "black",
                                }}
                              >
                                {property.property.rooms==10?"+10":property.property.rooms}
                              </span>
                            </Col>
                            <Col
                              xs={4}
                              style={{
                                color: "rgb(13, 110, 253)",
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faBath}
                                style={{ marginLeft: "5px" }}
                              />
                              <span
                                style={{
                                  color: "black",
                                }}
                              >
                                {property.property.bathrooms==6?"+6":property.property.bathrooms}
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col style={{ color: "#868686" }}>
                              <span
                                style={{
                                  color: "rgb(13, 110, 253)",
                                  fontSize: "18px",
                                  marginLeft: "7px",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faRulerCombined}
                                  style={{ marginLeft: "5px" }}
                                />
                                المساحة:
                              </span>
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "24px",
                                  fontWeight: "bold",
                                }}
                              >
                                {property.property.area}
                              </span>
                              متر مربع
                            </Col>
                          </Row>
                          <Row>
                            <Col style={{ color: "black" }} >
                              <h2>{property.property["Arabic Name"]}</h2>
                            </Col>
                          </Row>
                          <Row>
                            <p style={{ color: "#898989" ,margin:'0px' }}>
                              {property.property.details_ar&&renderLimitedText(property.property.details_ar, 150)}
                            </p>
                          </Row>
                          <Row>
                            <Col>
                              <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                style={{ marginLeft: "5px" }}
                              />
                              <span
                                style={{
                                  color: "black",
                                }}
                              >
                                {property.property.full_address}
                              </span>
                            </Col>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </div>
                  {/* Love button */}
                  <IconButton
                    loading={loadId===property.id}
                    onClick={() => handleLove(property.id, index)}
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
              ) : (
                // Quick Ads
                <Card as={Col} xs={11} sm={10} md={5} lg={3} className="position-relative mb-4 mx-3" key={index}>
                  <div className="imgCont" style={{ height: "auto" }}>
                    <Link
                      to={`/property/${property.slug}`}
                      className="link"
                    >
                      {property.property.images.length > 1 ? (
                        <Slider {...settings}>
                          {property.property.images.map((image, idx) => (
                            <div key={idx}>
                              <img
                                src={image.image}
                                alt={`imgCard-${idx}`}
                                key={idx}
                                style={{ width: "100%", height: "200px" }}
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <div>
                          <img
                            src={property.property.images[0].image}
                            alt={`صوره الاعلان`}
                            key={index}
                            style={{ width: "100%", height: "200px" }}
                          />
                        </div>
                      )}
                    </Link>
                    <div>
                      <a href={`tel:+2${property.phone}`}>
                        <Button variant="primary" className="m-2 btn-md">
                          <FontAwesomeIcon icon={faPhone} /> اتصل
                        </Button>
                      </a>
                      <Button
                          variant="secondary"
                          className="m-2 btn-md"
                          onClick={() => {
                            const mailtoLink = `mailto:${
                              property.email
                            }?subject=${encodeURIComponent(
                              "عقار على فارندا"
                            )}&body=${encodeURIComponent(
                              `الرقم التعريفى للاعلان: ${property.id}`
                            )}`;
                            window.location.href = mailtoLink;
                          }}
                        >
                          <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                        </Button>
                      <a
                        href={`https://api.whatsapp.com/send?phone=2${
                          property.whats_phone
                        }&text=${encodeURIComponent(
                          "مرحباً، أنا مهتم بعقارك الموجود على فارندا.: "
                        )}${encodeURIComponent(
                          `http://varnda.com/moreDeteliesPage/${property.slug}`
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
                  <div className="imgCont" style={{ height: "auto" }}>
                    <Link
                      to={`/moreDeteliesPage/${property.slug}`}
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
                            <p style={{ color: "#898989" ,margin:'0px'}}>
                              {property.property.details_ar&&renderLimitedText(property.property.details_ar, 500)}
                            </p>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </div>
                  {/* Love button */}
                  <IconButton
                    loading={loadId===property.id}
                    onClick={() => handleLove(property.id, index)}
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
              )
            )}
         </Row>
         </>
      )}
      </>
    );
}
