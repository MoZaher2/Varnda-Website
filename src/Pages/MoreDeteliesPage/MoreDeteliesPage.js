import React, { useState,useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MoreDeteliesPage.css";
import Cookies from 'js-cookie';
import api from "../../API/ApiLink.js";
import CardDetails from "../../Components/CardDetails/CardDetails.js";
import { useParams } from "react-router-dom";
import CommentCardAds from "../../Components/Comments/CommentCardAds.js";
import AddCommentAds from "../../Components/Comments/AddCommentAds.js";

import Share from "../../Components/Cards/Share.js";

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
          // console.log(adsData)
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
          <CommentCardAds ads_id={id} />
          <hr/>
          <AddCommentAds ads_id={id} />
        </Container>
      <Footer />
      {data&&<Share text={data.property["Arabic Name"]} url={`http://varnda.com/moreDeteliesPage/${encodeURIComponent(id)}`} />}
    </>
  );
};

export default MoreDeteliesPage;
