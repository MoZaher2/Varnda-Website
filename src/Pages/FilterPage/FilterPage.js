import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col,Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSearchAdvanced from "../../Components/HeaderSearchAdvanced/HeaderSearchAdvanced";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "../../Components/Cards/Card";
import { useLocation, useNavigate } from "react-router-dom";
import AddPropertyCard from "../../Components/Cards/AddProperty/AddPropertyCard";
import AddQuickCard from "../../Components/Cards/AddProperty/AddQuickCard";
import { useParams } from "react-router-dom";
import api from "../../API/ApiLink"

export default function FilterPage() {

  let { filter} = useParams();
  console.log(filter)
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)
  const [notFound,setNotFound]=useState(false)
  
  const GetFilterAds = async () => {
    setLoading(true)
    const formDataToSend = new FormData();
    formDataToSend.append("url", filter);
    try {
        const response = await api.post(`/search-byFilter`,  formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        console.log(response.data.data)
        setData(response.data.data)
    } catch (err) {
      if(err.response.status===404){
        setNotFound(true)
      }
        console.log(err);
    } finally {
      setLoading(false)
    }
}

useEffect(()=>{
if(filter){
  GetFilterAds()
}
},[filter])

  return (
    <>
      <Header />
      <Container>
        <Row className="d-flex justify-content-between mt-4">
          {/* ال Cards */}
          {notFound?<Alert key="warning" className="text-center" variant="warning">
              هذا الفلتر غير موجود 404
            </Alert>:
            <Col md={8} dir="rtl">
            <PropertyCard properties={data.ads} loading={loading} />
          </Col>
          }

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
