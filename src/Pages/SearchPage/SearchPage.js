import React, { useState } from "react";
import "./SearchPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSearchAdvanced from "../../Components/HeaderSearchAdvanced/HeaderSearchAdvanced";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "../../Components/Cards/Card";


import { useLocation, useNavigate } from "react-router-dom";
import AddPropertyCard from "../../Components/Cards/AddProperty/AddPropertyCard";
import AddQuickCard from "../../Components/Cards/AddProperty/AddQuickCard";
// import queryString from "query-string";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchPage() {

  const query = useQuery();//
  const navigate = useNavigate();//
  const [properties,setProperties]=useState([])
const [loading,setLoading]=useState(false)
  return (
    <>
      <Header />
      <HeaderSearchAdvanced
        query={query}
        navigate={navigate}
        setProperties={setProperties}
        setLoading={setLoading}
      />

      <Container>
        <Row className="d-flex justify-content-between">
          {/* ال Cards */}
          <Col md={8} dir="rtl">
            <PropertyCard properties={properties} loading={loading} />
          </Col>
          <Col md={4} dir="rtl">
            <h4 className="my-3 h4">نتائج مقترحة</h4>
            <ListGroup variant="flush">
              <Link
                to="/search/القاهرة?filter=الأحدث&rooms=1&selectedOption=sale"
                className="link-item"
              >
                <ListGroup.Item className="item">
                  عقارات 1 غرفة للبيع فى القاهرة
                </ListGroup.Item>
              </Link>
              <Link
                to="/search/القاهرة?filter=الأحدث&rooms=2&selectedOption=sale"
                className="link-item"
              >
                <ListGroup.Item className="item">
                  عقارات 2 غرفة للبيع فى القاهرة
                </ListGroup.Item>
              </Link>
              <Link
                to="/search/القاهرة?filter=الأحدث&rooms=0&selectedOption=sale"
                className="link-item"
              >
                <ListGroup.Item className="item">
                  عقارات استوديو للبيع فى القاهرة
                </ListGroup.Item>
              </Link>
              <Link to="/search?selectedOption=rent" className="link-item">
                <ListGroup.Item className="item">عقارات للايجار</ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <AddPropertyCard />
      <Footer />
      <AddQuickCard />
    </>
  );
}
