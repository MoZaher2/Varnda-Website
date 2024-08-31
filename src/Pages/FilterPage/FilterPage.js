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
import ShowFilterToUser from "../../Components/Filters/ShowFilterToUser";

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
          {notFound ? (
            <Alert key="warning" className="text-center" variant="warning">
              هذا الفلتر غير موجود 404
            </Alert>
          ) : (
            <Col md={8} dir="rtl">
              <PropertyCard properties={data.ads} loading={loading} />
            </Col>
          )}

          <Col md={4} dir="rtl">
            <ShowFilterToUser
              type={data.filter.type}
              gov={data.filter.gov}
              compound={data.filter.compound}
            />
          </Col>
        </Row>
      </Container>
      <AddPropertyCard />
      <Footer />
      <AddQuickCard />
    </>
  );
}
