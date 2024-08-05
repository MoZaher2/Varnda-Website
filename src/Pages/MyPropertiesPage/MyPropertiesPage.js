import React, { useEffect, useState } from 'react';
import PropertiesTable from '../../Components/PropertiesTable/PropertiesTable';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Alert } from "react-bootstrap";
import styles from './MyPropertiesPage.module.css'; // Import CSS module
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';

const MyPropertiesPage = () => {
  const token=Cookies.get("token")
  const user_id=Cookies.get("user_id")
  const [data,setData]=useState([])
  const [load,setLoad]=useState(false)
  // استرجاع اعلانات الشخص
  useEffect(() => {
    const handelSearch = async () => {
      try {
        const response = await api.get(`/searchAds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            user_id
          },
        });
        setData(response.data.data)
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    handelSearch();
  }, [user_id]);




  const handleEdit = (id) => {
    // Handle edit logic here
    console.log('Edit item with id:', id);
  };

  // حذف الاعلان
  const handleDelete = async (id) => {
    setLoad(true)
    try {
      const response = await api.post(`/deleteAd/${id}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false)
    }
  }
  return (
    <>
      <Header />
      {data.length>0?<div className={styles.container}>
        <h1 className={styles.heading}>عقاراتي</h1>
        <PropertiesTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>: <Alert key="warning" className="text-center" variant="warning">
                    لم تقم بنشر اعلانات بعد
                </Alert>}
      
      <Footer />
    </>
  );
};

export default MyPropertiesPage;
