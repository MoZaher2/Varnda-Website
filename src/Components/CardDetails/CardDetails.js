import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// تضمين الصور اللازمة
import card1 from "../../images/card_1.png";
import card2 from "../../images/card_2.png";
import card3 from "../../images/card_3.png";
import card4 from "../../images/card_4.png";

const CardDetails = ({ propertyDetails }) => {
    // التأكد من أن `propertyDetails` تم تعريفه قبل استخدامه
    if (!propertyDetails) {
        return null;
    }

    const position = [propertyDetails.property.latitude, propertyDetails.property.longitude];
    const myIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        shadowSize: [41, 41],
    });

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const rentName = propertyDetails.property.renting_type === 1 ? "شهرى" : propertyDetails.property.renting_type === 3 ? "ربع ثانوى" : propertyDetails.property.renting_type === 6 ? "نصف ثانوى" : propertyDetails.property.renting_type === 12 ? "ثانوى" : "";
    const subCategoryName = propertyDetails.property["Sub Category"] === "فيلا منفصلة" || propertyDetails.property["Sub Category"] === "تاون هاوس" || propertyDetails.property["Sub Category"] === "توين هاوس";

    return (
        <>
            <div className="details-container mt-5" dir="rtl">
                <Container>
                    <Row className="mb-4">
                        <Col xs={12} lg={6} style={{ position: "relative" }}>
                            <span className="outline-primary" style={{
                                top: '-35px',
                                position: 'absolute',
                                left: '12px',
                                padding: '4px 15px',
                                borderRadius: '5px',
                                color: '#0d6efd',
                                border: '1px solid #0d6efd'
                            }}>{propertyDetails.property.Type === "sale" ? "للبيع" : "للاجار"}</span>
                            <Slider {...sliderSettings}>
                                <div key={100}>
                                    <img
                                        src={propertyDetails.property.primary_picture}
                                        alt={`صوره الاعلان الرئيسيه`}
                                        className="img-fluid w-100"
                                    />
                                </div>
                                {propertyDetails.property.images.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image.image}
                                            alt={`Slide ${index}`}
                                            className="img-fluid w-100"
                                        />
                                    </div>
                                ))}

                            </Slider>
                            {/* <div style={{ display: propertyDetails.property.facilities.length > 0 ? "block" : "none" }}> */}
                            {propertyDetails.property.facilities && <>
                                <h3 className="mb-3" style={{ color: "#0d6efd" }} >المرافق</h3>
                                <ul className="list-group mb-3">
                                    {propertyDetails.property.facilities.map((advantage, index) => (
                                        <li key={index} className="list-group-item">
                                            {advantage}
                                        </li>
                                    ))}
                                </ul>
                            </>
                            }
                            {/* </div> */}

                            {/* <div style={{ display: propertyDetails.property.features.length > 0 ? "block" : "none" }}> */}
                            {propertyDetails.property.facilities && <>
                                <h3 className="mb-3" style={{ color: "#0d6efd" }} >المميزات</h3>
                                <ul className="list-group mb-3">
                                    {propertyDetails.property.features.map((advantage, index) => (
                                        <li key={index} className="list-group-item">
                                            {advantage}
                                        </li>
                                    ))}
                                </ul>
                            </>}

                            {/* </div> */}

                            {/* <div style={{ display: propertyDetails.property.services.length > 0 ? "block" : "none" }}> */}
                            {propertyDetails.property.services && <>
                                <h3 className="mb-3" style={{ color: "#0d6efd" }} >الخدمات</h3>
                                <ul className="list-group mb-3">
                                    {propertyDetails.property.services.map((advantage, index) => (
                                        <li key={index} className="list-group-item">
                                            {advantage}
                                        </li>
                                    ))}
                                </ul>
                            </>}

                            {/* </div> */}

                            {/* <div style={{ display: propertyDetails.property.devices.length > 0 ? "block" : "none" }}> */}
                            {
                                propertyDetails.property.devices && <>
                                    <h3 className="mb-3" style={{ color: "#0d6efd" }} >الأجهزه</h3>
                                    <ul className="list-group mb-3">
                                        {propertyDetails.property.devices.map((advantage, index) => (
                                            <li key={index} className="list-group-item">
                                                {advantage}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            }

                            {/* </div> */}

                            {/* <div style={{ display: propertyDetails.property.accessories.length > 0 ? "block" : "none" }}> */}
                            {propertyDetails.property.accessories && <>
                                <h3 className="mb-3" style={{ color: "#0d6efd" }} >الملحقات</h3>
                                <ul className="list-group mb-3">
                                    {propertyDetails.property.accessories.map((advantage, index) => (
                                        <li key={index} className="list-group-item">
                                            {advantage}
                                        </li>
                                    ))}
                                </ul>
                            </>}

                            {/* </div> */}
                        </Col>

                        <Col xs={12} lg={6} className="details">
                            <Row className="mb-3">
                                <div className="d-flex align-items-center">
                                    <h1 className="mb-3" style={{ color: "#0d6efd", marginLeft: "10px" }}>{propertyDetails.property.price} ج.م</h1>
                                    {propertyDetails.property.Discount && <p>يوجد خصم {propertyDetails.property.Discount}%</p>}
                                </div>
                            </Row>
                            <p className="mb-4" style={{ color: "#123", fontWeight: "700" }}>{propertyDetails.property["Arabic Name"]}</p>
                            <Row className="mb-3">
                                <Col xs={6} className="d-flex justify-content-between">
                                    <p style={{ color: "#888", fontWeight: "700" }}>المساحة:</p>
                                    <p style={{ color: "#0d6efd", fontWeight: "700" }}>{propertyDetails.property.area} متر</p>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={6} className="d-flex justify-content-between">
                                    <p style={{ color: "#888", fontWeight: "700" }}>الغرف:</p>
                                    <p style={{ color: "#0d6efd", fontWeight: "700" }}>{propertyDetails.property.rooms}</p>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={6} className="d-flex justify-content-between">
                                    <p style={{ color: "#888", fontWeight: "700" }}>الحمامات:</p>
                                    <p style={{ color: "#0d6efd", fontWeight: "700" }}>{propertyDetails.property.bathrooms}</p>
                                </Col>
                            </Row>

                            <p className="mb-4" style={{ color: "#123", fontWeight: "700" }}>{propertyDetails.property.details_ar}</p>
                            {propertyDetails.property.video_link &&
                                <div style={{ marginBottom: '15px' }}>
                                    <a href={propertyDetails.property.video_link} rel="noreferrer" target="_blank" style={{ fontSize: 20 }}>
                                        رابط فيديو لعرض العقار
                                    </a>
                                </div>
                            }

                            <h3 className="mb-3" style={{ color: "#0d6efd" }}>تفاصيل ال{propertyDetails.property["Sub Category"]}:</h3>

                            <div className="d-flex">
                                {propertyDetails.property.finishing_type && <p style={{ color: "#888", fontWeight: "700", marginLeft: '20px' }}>مرحلة التشطيب: {propertyDetails.property.finishing_type}</p>}
                                {(propertyDetails.property.finishing_type === "تشطيب بالأجهزة" || propertyDetails.property.finishing_type === "تشطيب كامل") && <p style={{ color: "#888", fontWeight: "700" }}> ({propertyDetails.property.Furnished ? "مفروشه" : "غير مفروشه"}) </p>}

                            </div>
                            {(propertyDetails.property.floor_number && !subCategoryName) && <p style={{ color: "#888", fontWeight: "700" }}>رقم الدور : {propertyDetails.property.floor_number}</p>}

                            {(propertyDetails.property.floors && (subCategoryName || !propertyDetails.property.floor_number)) && <p style={{ color: "#888", fontWeight: "700" }}>عدد الأدوار: {propertyDetails.property.floors}</p>}

                            {
                                propertyDetails.property.Type === "sale" ?
                                    <>
                                        {propertyDetails.property.payment_method && <p style={{ color: "#888", fontWeight: "700" }}>طريقة الدفع: {propertyDetails.property.payment_method}</p>}
                                        {propertyDetails.property.deliver_date && <p style={{ color: "#888", fontWeight: "700" }}>تاريخ التسليم: {propertyDetails.property.deliver_date}</p>}
                                        {propertyDetails.property.legal_papers && <p style={{ color: "#888", fontWeight: "700" }}>الأوراق القانونيه: {propertyDetails.property.legal_papers}</p>}
                                    </>
                                    :
                                    <>
                                        {rentName && <p style={{ color: "#888", fontWeight: "700" }}>نوع الايجار: {rentName}</p>}
                                    </>
                            }
                        </Col>
                    </Row>


                    <h3 className="mb-5" style={{ color: "#0d6efd" }}>العنوان بالكامل: {propertyDetails.property.full_address}</h3>
                    <Row>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position} icon={myIcon}>
                                <Popup>
                                    {propertyDetails.property.full_address}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Row>

                </Container>
            </div>
        </>
    );
};

export default CardDetails;
