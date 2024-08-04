import React, { useState,useEffect } from "react";
import Slider from "react-slick";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container, Row, Col, Card } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MoreDeteliesPage.css";
import card1 from "../../images/card_1.png";
import card2 from "../../images/card_2.png";
import card3 from "../../images/card_3.png";
import card4 from "../../images/card_4.png";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import Cookies from 'js-cookie';
import api from "../../API/ApiLink.js";
import CardDetails from "../../Components/CardDetails/CardDetails.js";
import { useParams } from "react-router-dom";
import CommentCardAds from "../../Components/Comments/CommentCardAds.js";
import AddCommentAds from "../../Components/Comments/AddCommentAds.js";


const MoreDeteliesPage = () => {
  const {id}=useParams()
const[data,setData]=useState("")
  useEffect(()=>{
    const getOneAds = async (e) => {
        try {
          const token=Cookies.get("token")
          const response = await api.get(`/getAd/${id}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          const adsData=response.data.data
          setData(adsData)
          console.log(adsData)
        }catch(err){
          console.log(err)
        }
      }
      getOneAds()
  },[])

  return (
    <>
      <Header />
      <CardDetails propertyDetails={data}/>
      <hr/>
        <Container>
          {/* <CommentCardAds post_id={article.id} /> */}
          <CommentCardAds ads_id={1} />
          <hr/>
          {/* <AddCommentAds id={article.id} /> */}
          <AddCommentAds ads_id={1} />
        </Container>
      <Footer />
    </>
  );
};

export default MoreDeteliesPage;
