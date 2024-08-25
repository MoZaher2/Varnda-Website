import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CardDetails.css"
import {
  faPhone,
  faBed,
  faBath,
  faEnvelope,
  faHome,
  faRulerCombined,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import VideoEmbed from "../../utility/VideoEmbed/VideoEmbed";

const CardDetails = ({ propertyDetails }) => {
  console.log(propertyDetails);
  const position = [
    propertyDetails.property.latitude,
    propertyDetails.property.longitude,
  ];
  const myIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const [subCategoryName, setSubCategoryName] = useState("");
  useEffect(() => {
    setSubCategoryName(
      propertyDetails.property["Sub Category"] === "فيلا منفصلة" ||
        propertyDetails.property["Sub Category"] === "تاون هاوس" ||
        propertyDetails.property["Sub Category"] === "توين هاوس"
    );
    console.log(subCategoryName)
  }, [propertyDetails]);

  return (
    <>
      <div
        className="details-container mt-5"
        style={{ background: "#f7f7f7" }}
        dir="rtl"
      >
        <Container>
          <Row className="mb-4">
            <Col md={12} lg={8} style={{ position: "relative" }}>
              <Row>
                <Col className="p-4" style={{ background: "white" }}>
                  <div>
                    <p style={{ color: "#1976d2", fontSize: "25px" }}>
                      {propertyDetails.property["Arabic Name"]}
                    </p>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <span
                      style={{
                        color: "#1976d2",
                        fontSize: "28px",
                        fontWeight: "bold",
                        marginLeft: "5px",
                        position: "relative",
                      }}
                    >
                      {Number(propertyDetails.property.price).toLocaleString(
                        "ar-EG"
                      )}
                      {propertyDetails.property.Discount && (
                        <span
                          style={{
                            position: "absolute",
                            right: "-60px",
                            top: "-10px",
                            fontSize: "13px",
                            color: "white",
                            background: "#1976d3d9",
                            borderRadius: "5px",
                            padding: "2px 3px",
                          }}
                        >
                          {" "}
                          خصم{propertyDetails.property.Discount}%
                        </span>
                      )}
                    </span>
                    <span>ج.م</span>
                  </div>
                </Col>
              </Row>

              <Row style={{ background: "white" }}>
                {propertyDetails.property.images.length > 0 ? (
                  <Slider {...sliderSettings}>
                    <div key={100}>
                      <img
                        src={propertyDetails.property.primary_picture}
                        alt={`صوره الاعلان الرئيسيه`}
                        className="img-fluid w-100"
                        style={{ width: "100%", height: "400px" }}
                      />
                    </div>
                    {propertyDetails.property.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image.image}
                          alt={`Slide ${index}`}
                          className="img-fluid w-100"
                          style={{ width: "100%", height: "400px" }}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div key={100}>
                    <img
                      src={propertyDetails.property.primary_picture}
                      alt={`صوره الاعلان الرئيسيه`}
                      className="img-fluid w-100"
                      style={{ width: "100%", height: "400px" }}
                    />
                  </div>
                )}
              </Row>

              <Row className="p-4" style={{ background: "white" }}>
                <h4 className="mb-4" style={{ color: "#1976d2" }}>
                  شرح العقار
                </h4>
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'rgb(72, 72, 72)'
                  }}
                >
                  {propertyDetails.property.details_ar}
                </p>
              </Row>

              <Row className="p-4 mt-3" style={{ background: "white" }}>
                <Col lg={12}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    تفاصيل العقار
                  </h4>
                </Col>
                <Col lg={12}>
                  <table className="w-100" style={{ color: "#212529" }}>
                    <tbody>
                      <tr>
                        <th
                          className="w-50 p-3"
                          style={{ borderTop: "1px solid #dee2e6" }}
                        >
                          العقار
                        </th>
                        <th
                          className="w-50 p-3 leftTablePart"
                        >
                          {propertyDetails.property.Type === "sale"
                            ? "للبيع"
                            : "للاجار"}
                        </th>
                      </tr>
                      <tr>
                        <th
                          className="w-50 p-3"
                          style={{ borderTop: "1px solid #dee2e6" }}
                        >
                          نوع العقار
                        </th>
                        <th
                          className="w-50 p-3 leftTablePart"
                        >
                          {propertyDetails.property["Sub Category"]}
                        </th>
                      </tr>
                      <tr>
                        <th
                          className="w-50 p-3"
                          style={{ borderTop: "1px solid #dee2e6" }}
                        >
                          العقار من
                        </th>
                        <th
                          className="w-50 p-3 leftTablePart"
                        >
                          {propertyDetails.advertiser_type}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>

              <Row className="p-4 mt-3" style={{ background: "white" }}>
                <Col lg={12}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    تفاصيل أساسية
                  </h4>
                </Col>
                <Col lg={12}>
                  <table className="w-100" style={{ color: "#212529" }}>
                    <tbody>
                      <tr>
                        <th
                          className="w-50 p-3"
                          style={{ borderTop: "1px solid #dee2e6" }}
                        >
                          المساحة
                        </th>
                        <th
                          className="w-50 p-3 leftTablePart"
                        >
                          {propertyDetails.property.area} متر مربع
                        </th>
                      </tr>
                      {(subCategoryName ||
                        propertyDetails.property.Category == "مبانى" ||
                        propertyDetails.property.Category == "منازل") &&
                        propertyDetails.property.floors != null && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              عدد الأدوار
                            </th>
                            <th
                              className="w-50 p-3 leftTablePart"
                            >
                              {propertyDetails.property.floors}
                            </th>
                          </tr>
                        )}

                      {propertyDetails.property.floor_number != null &&
                        !subCategoryName && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              رقم الدور
                            </th>
                            <th
                              className="w-50 p-3 leftTablePart"
                            >
                              {propertyDetails.property.floor_number == 0
                                ? "دور ارضى"
                                : propertyDetails.property.floor_number == 10
                                ? "+10"
                                : propertyDetails.property.floor_number}
                            </th>
                          </tr>
                        )}

                      <tr>
                        <th
                          className="w-50 p-3"
                          style={{ borderTop: "1px solid #dee2e6" }}
                        >
                          عدد الغرف
                        </th>
                        <th
                          className="w-50 p-3 leftTablePart"
                        >
                          {propertyDetails.property.rooms == 10
                            ? "+10"
                            : propertyDetails.property.rooms}
                        </th>
                      </tr>
                      <tr>
                        <th
                          className="w-50 p-3"
                          style={{ borderTop: "1px solid #dee2e6" }}
                        >
                          عدد الحمامات
                        </th>
                        <th
                          className="w-50 p-3 leftTablePart"
                        >
                          {propertyDetails.property.bathrooms == 6
                            ? "+6"
                            : propertyDetails.property.bathrooms}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>

              <Row className="p-4 mt-3" style={{ background: "white" }}>
                <Col lg={12}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    السعر
                  </h4>
                </Col>
                <Col lg={12}>
                  <table className="w-100" style={{ color: "#212529" }}>
                    <tbody>
                      <tr>
                        <th
                          className="w-50 p-3"
                          style={{ borderTop: "1px solid #dee2e6" }}
                        >
                          السعر و الاستلام
                        </th>
                        <th
                          className="w-50 p-3 leftTablePart"
                        >
                          {Number(
                            propertyDetails.property.price
                          ).toLocaleString("ar-EG")}{" "}
                          ج.م
                        </th>
                      </tr>
                      {propertyDetails.property.Type === "sale" && (
                        <>
                          {propertyDetails.property.payment_method && (
                            <tr>
                              <th
                                className="w-50 p-3"
                                style={{ borderTop: "1px solid #dee2e6" }}
                              >
                                طريقة الدفع
                              </th>
                              <th
                                className="w-50 p-3 leftTablePart"
                              >
                                {propertyDetails.property.payment_method}
                              </th>
                            </tr>
                          )}
                          {propertyDetails.property.deliver_date && (
                            <tr>
                              <th
                                className="w-50 p-3"
                                style={{ borderTop: "1px solid #dee2e6" }}
                              >
                                تاريخ التسليم
                              </th>
                              <th
                                className="w-50 p-3 leftTablePart"
                              >
                                {propertyDetails.property.deliver_date == 0
                                  ? "فورى"
                                  : propertyDetails.property.deliver_date}
                              </th>
                            </tr>
                          )}
                          {propertyDetails.property.legal_papers && (
                            <tr>
                              <th
                                className="w-50 p-3"
                                style={{ borderTop: "1px solid #dee2e6" }}
                              >
                                الأوراق القانونيه
                              </th>
                              <th
                                className="w-50 p-3 leftTablePart"
                              >
                                {propertyDetails.property.legal_papers}
                              </th>
                            </tr>
                          )}
                          {propertyDetails.property.finishing_type && (
                            <tr>
                              <th
                                className="w-50 p-3"
                                style={{ borderTop: "1px solid #dee2e6" }}
                              >
                                مرحلة التشطيب
                              </th>
                              <th
                                className="w-50 p-3 leftTablePart"
                              >
                                {propertyDetails.property.finishing_type}

                                {(propertyDetails.property.finishing_type ===
                                  "تشطيب بالأجهزة" ||
                                  propertyDetails.property.finishing_type ===
                                    "تشطيب كامل") && (
                                  <p
                                    style={{
                                      color: "#888",
                                      fontWeight: "700",
                                      margin: "0px",
                                    }}
                                  >
                                    {" "}
                                    (
                                    {propertyDetails.property.Furnished
                                      ? "مفروشه"
                                      : "غير مفروشه"}
                                    ){" "}
                                  </p>
                                )}
                              </th>
                            </tr>
                          )}
                        </>
                      )}

                      {propertyDetails.property.Type === "rent" && (
                        <>
                          {propertyDetails.property.renting_type && (
                            <tr>
                              <th
                                className="w-50 p-3"
                                style={{ borderTop: "1px solid #dee2e6" }}
                              >
                                نوع الايجار
                              </th>
                              <th
                                className="w-50 p-3 leftTablePart"
                              >
                                {propertyDetails.property.renting_type == 1
                                  ? "شهرى"
                                  : propertyDetails.property.renting_type == 3
                                  ? "ربع سنوى"
                                  : propertyDetails.property.renting_type == 6
                                  ? "نصف سنوى"
                                  : propertyDetails.property.renting_type == 12
                                  ? "سنوى"
                                  : ""}
                              </th>
                            </tr>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </Col>
              </Row>

              <Row className="p-4 mt-3" style={{ background: "white" }}>
                <Col lg={12}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    الموقع
                  </h4>
                </Col>
                <Col lg={12}>
                  <table className="w-100" style={{ color: "#212529" }}>
                    <tbody>
                      {propertyDetails.property.governorate && (
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            المحافظة
                          </th>
                          <th
                            className="w-50 p-3 leftTablePart"
                          >
                            {propertyDetails.property.governorate}
                          </th>
                        </tr>
                      )}
                      {propertyDetails.property.city && (
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            المدينة
                          </th>
                          <th
                            className="w-50 p-3 leftTablePart"
                          >
                            {propertyDetails.property.city}
                          </th>
                        </tr>
                      )}
                      {propertyDetails.property.region && (
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            المنطقة
                          </th>
                          <th
                            className="w-50 p-3 leftTablePart"
                          >
                            {propertyDetails.property.region}
                          </th>
                        </tr>
                      )}
                      {propertyDetails.property.street && (
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            الشارع
                          </th>
                          <th
                            className="w-50 p-3 leftTablePart"
                          >
                            {propertyDetails.property.street}
                          </th>
                        </tr>
                      )}
                      {propertyDetails.property.compound_name && (
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            الكومباوند
                          </th>
                          <th
                            className="w-50 p-3 leftTablePart"
                          >
                            {propertyDetails.property.compound_name}
                          </th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Col>
              </Row>

              <Row className="p-2 mt-3" style={{ background: "white" }}>
                <h4 className="mb-3" style={{ color: "#1976d2" }}>
                  تواصل مع صاحب الاعلان
                </h4>
                <Col lg={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <a href={`tel:+2${propertyDetails.phone}`}>
                      <Button variant="primary" className="m-2 btn-lg">
                        <FontAwesomeIcon icon={faPhone} /> اتصل
                      </Button>
                    </a>
                    <Button
                      variant="secondary"
                      className="m-2 btn-lg"
                      onClick={() => {
                        const mailtoLink = `mailto:${
                          propertyDetails.email
                        }?subject=${encodeURIComponent(
                          "عقار على فارندا"
                        )}&body=${encodeURIComponent(
                          `الرقم التعريفى للاعلان: ${propertyDetails.id}`
                        )}`;
                        window.location.href = mailtoLink;
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                    </Button>
                    <a
                      href={`https://api.whatsapp.com/send?phone=2${
                        propertyDetails.whats_phone
                      }&text=${encodeURIComponent(
                        "مرحباً، أنا مهتم بعقارك الموجود على فارندا.: "
                      )}${encodeURIComponent(
                        `http://varnda.com/property/${propertyDetails.slug}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="success" className="m-2 btn-lg">
                        <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                      </Button>
                    </a>
                  </div>
                </Col>
              </Row>

              {propertyDetails.property.video_link && (
                <Row className="p-3 mt-3" style={{ background: "white" }}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    <a
                      href={propertyDetails.property.video_link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      فيديو للعقار
                    </a>
                  </h4>
                  <VideoEmbed videoUrl={propertyDetails.property.video_link} />
                </Row>
              )}

              {propertyDetails.property.facilities.length > 0 && (
                <Row className="p-3 mt-3" style={{ background: "white" }}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    المرافق
                  </h4>
                  <ul className="list-group mb-3">
                    {propertyDetails.property.facilities.map(
                      (advantage, index) => (
                        <li key={index} className="list-group-item extraTable">
                          {advantage}
                        </li>
                      )
                    )}
                  </ul>
                </Row>
              )}

              {propertyDetails.property.facilities.length > 0 && (
                <Row className="p-3 mt-3" style={{ background: "white" }}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    المميزات
                  </h4>
                  <ul className="list-group mb-3">
                    {propertyDetails.property.features.map(
                      (advantage, index) => (
                        <li key={index} className="list-group-item extraTable">
                          {advantage}
                        </li>
                      )
                    )}
                  </ul>
                </Row>
              )}

              {propertyDetails.property.services.length > 0 && (
                <Row className="p-3 mt-3" style={{ background: "white" }}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    الخدمات
                  </h4>
                  <ul className="list-group mb-3">
                    {propertyDetails.property.services.map(
                      (advantage, index) => (
                        <li key={index} className="list-group-item extraTable">
                          {advantage}
                        </li>
                      )
                    )}
                  </ul>
                </Row>
              )}

              {propertyDetails.property.devices.length > 0 && (
                <Row className="p-3 mt-3" style={{ background: "white" }}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    الأجهزه
                  </h4>
                  <ul className="list-group mb-3">
                    {propertyDetails.property.devices.map(
                      (advantage, index) => (
                        <li key={index} className="list-group-item extraTable">
                          {advantage}
                        </li>
                      )
                    )}
                  </ul>
                </Row>
              )}

              {propertyDetails.property.accessories.length > 0 && (
                <Row className="p-3 mt-3" style={{ background: "white" }}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    الملحقات
                  </h4>
                  <ul className="list-group mb-3">
                    {propertyDetails.property.accessories.map(
                      (advantage, index) => (
                        <li key={index} className="list-group-item extraTable">
                          {advantage}
                        </li>
                      )
                    )}
                  </ul>
                </Row>
              )}
            </Col>

            <Row className="p-3 mt-3" style={{ background: "white" }}>
              <h4 className="mb-3" style={{ color: "#1976d2" }}>
                العنوان بالكامل
                <span
                  style={{
                    marginRight: "10px",
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "#484848",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ marginLeft: "5px", color: "#1976d2" }}
                  />
                  {propertyDetails.property.full_address}
                </span>
              </h4>
              <Row>
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position} icon={myIcon}>
                    <Popup>{propertyDetails.property.full_address}</Popup>
                  </Marker>
                </MapContainer>
              </Row>
            </Row>
            {/* <Col xl={4} lg={4} className="details">
                الجزء اللى على الشمال
              </Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CardDetails;
