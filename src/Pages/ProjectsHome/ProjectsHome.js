import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row, Alert } from "react-bootstrap";
import api from "../../API/ApiLink";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import OverPage from "../../Components/OverPage/OverPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProjectsHome() {
  const [overlay, setOverlay] = useState(false);
  const [allGov, setAllGov] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allCompounds, setAllCompounds] = useState([]);
  const [formData, setFormData] = useState({
    gov: "",
    city: "",
  });

  // المحافظات
  useEffect(() => {
    const fetchAllGov = async () => {
      try {
        setOverlay(true);
        const response = await api.get("/getAllGovernoratesForHomepage");
        setAllGov(response.data.data);
      } catch (err) {
        setAllGov([]);
        console.log(err);
      } finally {
        setOverlay(false);
      }
    };
    fetchAllGov();
  }, []);
  // المدن
  useEffect(() => {
    const fetchAllCity = async () => {
      try {
        setOverlay(true);
        const response = await api.get(`/getGovCities/${formData.gov}`);
        setAllCities(response.data.data);
      } catch (err) {
        setAllCities([]);
        console.log(err);
      } finally {
        setOverlay(false);
      }
    };
    if (formData.gov) {
      fetchAllCity();
    }
  }, [formData.gov]);

  // المشروعات
  useEffect(() => {
    const fetchAllCompound = async () => {
      try {
        setOverlay(true);
        const response = await api.get(`/getCityCompounds/${formData.city}`);
        setAllCompounds(response.data.data);
      } catch (err) {
        setAllCompounds([]);
        console.log(err);
      } finally {
        setOverlay(false);
      }
    };
    if (formData.city) {
      fetchAllCompound();
    }
  }, [formData.city]);

  return (
    <>
      <Header />
      <Container className="mb-3">
        <h1 className="text-center title-page py-1 pb-2 container my-3">
          المشروعات العقارية
        </h1>

        {overlay ? (
          <OverPage />
        ) : (
          <>
            {/* المحافظات */}
            {allGov.length > 0 && !formData.gov && (
              <Row className="g-3 my-1">
                {allGov.map(
                  (gov) =>
                    gov.url && (
                      <Col xs={4} sm={4} md={3} lg={2} className="text-center">
                        <Button
                          variant="outline-primary"
                          size="md"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              gov: gov.url,
                            });
                          }}
                        >
                          {gov.name}
                        </Button>
                      </Col>
                    )
                )}
              </Row>
            )}
            {/* المدن */}
            {allCities.length > 0 && !formData.city && (
              <>
                <Row className="g-3">
                  {allCities.map(
                    (city) =>
                      city.url && (
                        <Col
                          xs={4}
                          sm={4}
                          md={3}
                          lg={2}
                          className="text-center"
                        >
                          <Button
                            variant="outline-primary"
                            size="md"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                city: city.url,
                              });
                            }}
                          >
                            {city.name}
                          </Button>
                        </Col>
                      )
                  )}
                  <div className="d-flex justify-content-end my-2">
                    <Button
                      style={{ direction: "ltr" }}
                      onClick={() => {
                        setAllCities([]);
                        setFormData({
                          ...formData,
                          gov: "",
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span className="ms-2">الرجوع</span>
                    </Button>
                  </div>
                </Row>
              </>
            )}
            {/* المشروعات العقارية */}
            {allCompounds.length > 0 ? (
              <Row className="g-3">
                {allCompounds.map(
                  (compound) =>
                    compound.url && (
                      <Col md={6} lg={4} className="text-center">
                        <Link
                          to={`/projects/${compound.url}`}
                          key={compound.url}
                        >
                          <Button variant="outline-primary" size="md">
                            {compound.name}
                          </Button>
                        </Link>
                      </Col>
                    )
                )}
              </Row>
            ) :formData.city? 
              <Alert key="warning" className="text-center" variant="warning">
                لا يوجد مشروعات
              </Alert>
            :<></>}
            {formData.gov&&formData.city && (
              <div className="d-flex justify-content-end my-2">
                <Button
                  style={{ direction: "ltr" }}
                  onClick={() => {
                    setAllCompounds([]);
                    setFormData({
                      ...formData,
                      city: "",
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span className="ms-2">الرجوع</span>
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
