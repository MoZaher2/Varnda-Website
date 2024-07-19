import React, { useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import personImage from "../../images/personImage.jpg";
import Header from '../../Components/Header/Header';
import { Image, Col, Container, Row, Form, Button } from 'react-bootstrap';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // State for user details form
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    userType: ' ',
    about: ''
  });

  // State for profile image
  const [profileImage, setProfileImage] = useState(personImage);
  const [imageSelected, setImageSelected] = useState(false);


  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle user form changes
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      alert('كلمات المرور الجديدة غير متطابقة');
      return;
    }

    console.log('Password form submitted:', passwordForm);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    console.log('User form submitted:', userForm);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setImageSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveImage = () => {
    console.log('Image saved:', profileImage);
    // Here you would typically send the image to your backend
    setImageSelected(false);
  };
  return (
    <>
      <Header />
      <Container className={`${styles.container} mt-5`}>
        <h2>صفحتي الشخصية</h2>
        <Row>
          <Col md={6} xs={12} className={`${styles.responsiveColumn} mb-4`}>
            <div className={styles.box}>
              <h5 className={styles.heading}>تغير الصورة الشخصية</h5>
              <Col xs={6} md={4} className="mx-auto">
                <Image src={profileImage} className='rounded-circle w-100 mt-3 mb-4' />
              </Col>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="imageInput"
              />
              <div className="d-flex gap-5 flex-column flex-sm-row justify-content-between align-items-center mt-3">
                <Button
                  className="btn btn-primary  w-50 "
                  onClick={() => document.getElementById('imageInput').click()}
                >
                  اختيار الصورة
                </Button>
                <Button
                  className="btn btn-success  w-50 "
                  onClick={handleSaveImage}
                  disabled={!imageSelected}
                >
                  حفظ الصورة
                </Button>
              </div>
            </div>
            <Form className={styles.box} onSubmit={handlePasswordSubmit}>
              <h5 className={`${styles.heading} mt-2`}>تغير كلمة المرور</h5>
              <Form.Group controlId="formCurrentPassword">
                <Form.Label className="mt-2">كلمة المرور الحالية</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword">
                <Form.Label className="mt-2">كلمة مرور جديدة</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Form.Group controlId="formConfirmNewPassword">
                <Form.Label className="mt-2">تأكيد كلمة المرور الجديدة</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmNewPassword"
                  value={passwordForm.confirmNewPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary mt-3 w-50">حفظ التعديل</Button>
            </Form>
          </Col>
          <Col md={6} xs={12}>
            <Form className={styles.box} onSubmit={handleUserFormSubmit}>
              <h5 className={`${styles.heading} mt-2`}>بياناتي</h5>
              <Form.Group controlId="formName">
                <Form.Label className='mt-5'>الاسم</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userForm.name}
                  onChange={handleUserFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className='mt-2'>البريد الإلكتروني</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleUserFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label className='mt-2'>رقم التليفون</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={userForm.phone}
                  onChange={handleUserFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formWhatsApp">
                <Form.Label className='mt-2'>رقم الواتس اب</Form.Label>
                <Form.Control
                  type="text"
                  name="whatsapp"
                  value={userForm.whatsapp}
                  onChange={handleUserFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formUserType">
                <Form.Label className='mt-2'>نوع المستخدم</Form.Label>
                <Form.Select
                  name="userType"
                  value={userForm.userType}
                  onChange={handleUserFormChange}
                >
                  <option>اختر</option>
                  <option>مسوق عقاري</option>
                  <option>مالك عقار</option>
                  <option>مطور عقاري</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formAbout">
                <Form.Label className='mt-4'>تكلم عن نفسك</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="تكلم عن نفسك ..."
                  name="about"
                  value={userForm.about}
                  onChange={handleUserFormChange}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary mt-5 w-50">حفظ التعديل</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;