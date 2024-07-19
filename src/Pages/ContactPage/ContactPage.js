import React from 'react'
import { useFormik } from 'formik';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./ContactPage.css"
import Header from '../../Components/Header/Header';
import imageEgypt from "../../images/مصر.svg"
import Footer from '../../Components/Footer/Footer';
export default function ContactPage() {

  const myIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    shadowSize: [41, 41],
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const position = [30.0444, 31.2357];
  return (
    <>
      <Header />
      <h2 className="text-center h1 py-2" style={{ fontWeight: "700", color: "#0d6efd" }}>اتصل بنا</h2>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '550px', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={myIcon}>
          <Popup>نحن هنا</Popup>
        </Marker>
        <ZoomControl position="topright" />
      </MapContainer>
      <form onSubmit={formik.handleSubmit} className="p-3 form" dir="rtl">
        <div>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="الاسم*"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="البريد الالكترونى*"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>

          <input
            id="phone"
            name="phone"
            type="phone"
            placeholder="الهاتف*"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>
        <div>

          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="عنوان الرسالة*"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
        </div>
        <div>

          <textarea
            id="message"
            name="message"
            placeholder="نص الرسالة*"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </div>
        <button type="submit" className="w-100 text-center sendEmail">إرسال عبر البريد الإلكتروني</button>
      </form>

      <h2 className="h1 text-center">العنوان</h2>
      <p className="fs-5 my-4 text-center " style={{ fontWeight: "700", color: "#0d6efd" }}>القطاع الثاني قطعة 176 مصر <img src={imageEgypt} alt="مصر" width="50" className="ms-3" /></p>

      <Footer />

    </>
  );
}
