import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./SignupPage.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../API/ApiLink.js";
import LoadingBtn from "../../Components/LoadingBtn.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import OverPage from "../../Components/OverPage/OverPage.js";

export default function SignupPage() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [formData, setFormData] = useState({});
  // const handelChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const isValidPhone = (phoneNumber) => {
    const egPhone = /^(010|011|012|015)\d{8}$/;
    return egPhone.test(phoneNumber);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "phone") {
      if (!isValidPhone(value)) {
        e.target.setCustomValidity("يرجى إدخال رقم هاتف صحيح");
      } else {
        e.target.setCustomValidity("");
      }
    }
  };



  const handelSubmit = async (e) => {
    setShow(false);
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      
      if (formData.password !== formData.password_confirmation) {
        setAlert({
          msg: "كلمات المرور الجديدة غير متطابقة",
          variant: 3
        })
        setShow(true);
      } else {
        setLoad(true);
        try {
          const response = await api.post("/register", {
            ...formData,
          });
          Cookies.set("token", response.data.data.token);
          setLoad(false);
          setOverlay(true);
          setShow(true);
          setAlert({ msg: "تم انشاء الحساب بنجاح", variant: 1 });
          navigate("/");
        } catch (error) {
          setLoad(false);
          setShow(true);
          let message = "";
          let errData=error.response.data.data
          if (error.code === "ERR_NETWORK") {
            setAlert({
              msg: "خطا فى الشبكه. تأكد من الاتصال بالانترنت و اعد المحاوله",
              variant: 2,
            });
          } else if (error.response.status === 422) {
            if (errData.phone && errData.email) {
              message = "الايميل و رقم الهاتق مستخدمين من قبل";
            } else if (errData.email) {
              message = "الايميل مستخدم من قبل";
            } else if (errData.phone) {
              message = "رقم الهاتف مستخدم من قبل";
            }
            setAlert({
              msg: message,
              variant: 3,
            });
          }
        }
      }
    }
    setValidated(true);
  };

  return (
    <Container className="signup-container mt-3" dir="rtl">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7}>
          <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
            إنشاء حساب
          </h2>

          <Form
            className="p-4 border rounded"
            noValidate
            validated={validated}
            onSubmit={handelSubmit}
          >
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>الاسم الشخصى</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="الاسم الشخصى"
                  onChange={handelChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>ااسم العائله</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="اسم العائله"
                  onChange={handelChange}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group controlId="formBasicEmail" className="mt-2">
              <Form.Label className="fs-5 mb-2">البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ادخل البريد الإلكتروني"
                onChange={handelChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                ادخل الايميل بشكل صحيح
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label className="mt-2">رقم التليفون</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                onChange={handelChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Label className="fs-5 mb-2">كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="ادخل كلمة المرور"
                onChange={handelChange}
                required
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                كلمه المرور لا تقل عن 8 احرف
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Label className="fs-5 mb-2"> تأكيد كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                placeholder=" ادخل كلمة المرور مرة أخرى "
                onChange={handelChange}
                required
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                كلمه المرور لا تقل عن 8 احرف
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-2">
              {load ? <LoadingBtn /> : "إنشاء حساب"}
            </Button>
          </Form>

          {/*  */}
          <div className="text-center mt-2">
            <Button variant="light" className="google-button w-100">
              إنشاء حساب باستخدام جوجل
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            </Button>
          </div>

          <div className="text-center mt-2">
            <Link to="/login">لديك حساب بالفعل؟ تسجيل الدخول هنا</Link>
          </div>
        </Col>
      </Row>
      {/*  */}
      {show && (
        <>
          <AlertMessage
            msg={alert.msg}
            setShow={setShow}
            variant={alert.variant}
          />
        </>
      )}
      {overlay && (
        <>
          <OverPage />
        </>
      )}
      {/*  */}
    </Container>
  );
}
