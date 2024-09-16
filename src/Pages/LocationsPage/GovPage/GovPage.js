import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import PageSwapper from "../../../Components/Swapper/PageSwapper/PageSwapper";
import { useEffect, useState } from "react";
import api from "../../../API/ApiLink.js";
import { useParams } from "react-router-dom";
import OverPage from './../../../Components/OverPage/OverPage';
import usePageSEO from "../../../hooks/usePageSEO.js";
import NotFoundPage from "../../NotFoundPage/NotFoundPage.js";
import CardPage from "../../../Components/Cards/CardPage.js";

export default function GovPage() {

  let { gov } = useParams();
  const [data, setData] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading,setLoading]=useState(false)
  // API for get data to choose from it
  useEffect(() => {
    const fetchGov = async () => {
      try {
        setOverlay(true)
        setLoading(true)
        const response = await api.get(`/getAdsByGovernorate/${gov}`);
        setData(response.data.data)
      } catch (error) {
        console.log(error);
        if(error.response.data.status===404)
        {
          setNotFound(true)
        }
      }finally{
        setOverlay(false)
        setLoading(false)
      }
    };
    fetchGov();
  }, [gov]);


  // Set default SEO settings
  usePageSEO({
    title: data.meta_title|| "محافظة",
    description: data.meta_description || "",
  });

  return (
    <>
      {notFound ? (
        <NotFoundPage />
      ) : (
        <>
          <Header />
          <h1 className="text-center title-page py-1 pb-2 container my-3">
           {data.h1_title}
          </h1>
          {overlay ? (
            <OverPage />
          ) : (
            <>
              <PageSwapper swapperData={data.cities} pageType='gov' />
              <CardPage properties={data.Ads} loading={loading} />
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
