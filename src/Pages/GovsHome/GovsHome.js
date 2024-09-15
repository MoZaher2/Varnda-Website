import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import api from "../../API/ApiLink";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import usePageSEO from "../../hooks/usePageSEO";

export default function GovsHome() {

    // Set SEO settings
    usePageSEO({
      title: "المحافظات",
      description: "استكشف أفضل العقارات في المحافظات والمدن مع خيارات متنوعة تناسب جميع الاحتياجات. اختر موقعك المثالي الآن وابدأ رحلتك في السكن والاستثمار.",
      keywords:["المحافظات"],
    });
  const [allGov, setAllGov] = useState([]);
  useEffect(() => {
    const fetchAllGov = async () => {
      try {
        const response = await api.get("/getAllGovernoratesForHomepage");
        setAllGov(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllGov();
  }, []);

  return (
    <>
      <Header />
      <Container className="mb-3">
        <h1 className="text-center title-page py-1 pb-2 container my-3">
          المحافظات
        </h1>
        {allGov.length > 0 && (
          <Row
          className="g-3"
          >
            {allGov.map(
              (gov) =>
                gov.url && (
                  <Col xs={4} sm={4} md={3} lg={2} className="text-center">
                    <Link to={`/${gov.url}`} key={gov.url}>
                      <Button variant="outline-primary" size="md">
                        {gov.name}
                      </Button>
                    </Link>
                  </Col>
                )
            )}
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
}
