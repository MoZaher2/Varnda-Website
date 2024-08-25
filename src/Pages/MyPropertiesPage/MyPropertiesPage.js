import React, { useEffect, useState } from "react";
import PropertiesTable from "../../Components/PropertiesTable/PropertiesTable";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Alert } from "react-bootstrap";
import styles from "./MyPropertiesPage.module.css"; // Import CSS module
import api from "../../API/ApiLink.js";
import Cookies from "js-cookie";
import OverPage from "../../Components/OverPage/OverPage.js";

const MyPropertiesPage = () => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");
  const [data, setData] = useState([]);
  const [overlay, setOverlay] = useState(false);
  // استرجاع اعلانات الشخص
  const handelSearch = async () => {
    try {
      setOverlay(true);
      const response = await api.get(`/searchAds`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id,
        },
      });
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    handelSearch();
  }, [user_id]);

  return (
    <>
      <Header />
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {data.length > 0 ? (
            <div className={styles.container}>
              <h1 className={styles.heading}>عقاراتي</h1>
              <PropertiesTable data={data} />
            </div>
          ) : (
            <Alert key="warning" className="text-center" variant="warning">
              لم تقم بنشر اعلانات بعد
            </Alert>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default MyPropertiesPage;
