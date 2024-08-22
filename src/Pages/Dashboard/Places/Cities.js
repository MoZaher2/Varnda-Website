import { useEffect, useState } from "react";
import { Form, Button, Table, Modal, Row, Col, Alert } from "react-bootstrap";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from "js-cookie";
import OverPage from "../../../Components/OverPage/OverPage.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import DeleteItem from "../../../Components/DeleteItem/DeleteItem.js";

export default function Cities() {
  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    governorate: 1,
    name: "",
    english_name: "",
    meta_title: "",
    h1_title: "",
    meta_description: "",
    image: "",
    url: "",
  });

  //
  const [editData, setEditData] = useState({
    name: "",
    english_name: "",
    meta_title: "",
    h1_title: "",
    meta_description: "",
    image: "",
    url: "",
  });
  const resetData = () => {
    setFormData({
      ...formData,
      name: "",
      english_name: "",
      meta_title: "",
      h1_title: "",
      meta_description: "",
      image: "",
      url: "",
    });
  };

  const [loadId, setLoadId] = useState(false);
  const [image, setImage] = useState(null);
  const [loadEdit, setLoadEdit] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [governorates, setGovernorates] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [cities, setCities] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (id, city) => {
    console.log(city);
    setSelectedItemId(id);
    setEditData({
      name: city.name,
      english_name: city.english_name,
      meta_title: city.meta_title,
      h1_title: city.h1_title,
      meta_description: city.meta_description,
      image: city.image,
      url: city.url,
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // استرجاع المحافظات
  useEffect(() => {
    const fetchGov = async () => {
      try {
        const response = await api.get("/governorates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGovernorates(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchGov();
  }, []);

  //استرجاع المدن
  const fetchCity = async () => {
    try {
      setOverlay(true);
      const response = await api.get(
        `/governorates/${formData.governorate}/cities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCities(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    fetchCity();
  }, [formData.governorate]);

  // تعديل المدن
  const handleEdite = async () => {
    setLoadEdit(true);
    const allFormData = new FormData();
    // Append form fields
    for (const [key, value] of Object.entries(editData)) {
      if (key !== "image" && value) {
        allFormData.append(key, value);
      }
    }
    if (newImage) {
      allFormData.append("image", editData.image[0]);
    }
    try {
      const response = await api.post(
        `/updateCity/${selectedItemId}`,
        allFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchCity();
      setNewImage(null);
      setShow(false);
    } catch (err) {
      if (err.response.data.status == 422) {
        console.log("first");
        setAlert({ msg: "هناك رابط اخر مشابهه لهذا", variant: 3 });
        setShowAlert(true);
      }
    } finally {
      setLoadEdit(false);
    }
  };

  // حذف المدينة
  const handleDelete = async (id) => {
    try {
      setLoadId(true);
      const response = await api.post(`/deleteCity/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCity();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadId(false);
    }
  };

  // اضافه مدينة
  const handleAddCities = async (e) => {
    e.preventDefault();
    if (formData.name) {
      setLoad(true);
      const allFormData = new FormData();
      // Append other form fields
      for (const [key, value] of Object.entries(formData)) {
        if (key !== "image") {
          allFormData.append(key, value);
        }
      }
      allFormData.append("governorate_id", formData.governorate);
      if (image) {
        allFormData.append("image", formData.image[0]);
      }
      try {
        const response = await api.post("/addCity", allFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        fetchCity();
        resetData();
        setImage(null);
      } catch (err) {
        if (err.response.data.status == 422) {
          console.log("first");
          setAlert({ msg: "هناك رابط اخر مشابهه لهذا", variant: 3 });
          setShowAlert(true);
        }
      } finally {
        setLoad(false);
      }
    }
  };

  function handelEditeChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file" && name === "image") {
      setNewImage(files[0]);
      setEditData({
        ...editData,
        [name]: files,
      });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  }

  function handelChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file" && name === "image") {
      setImage(files[0]);
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  return (
    <>
      <Form onSubmit={handleAddCities} className="mt-3">
        <Row className="mb-2">
          <Form.Group as={Col} xs="6" controlId="formArName">
            <Form.Label className="required">اسم المدينة</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="اسم المدينة بالعربى"
              onChange={handelChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" controlId="formAEnName">
            <Form.Label>اسم المدينة انجليزى</Form.Label>
            <Form.Control
              type="text"
              name="english_name"
              value={formData.english_name}
              placeholder="اسم المدينة بالانجليزى"
              onChange={handelChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} xs="6" controlId="formTitle">
            <Form.Label>العنوان الرئيسي</Form.Label>
            <Form.Control
              type="text"
              name="h1_title"
              value={formData.h1_title}
              onChange={handelChange}
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" controlId="formMetaTitle">
            <Form.Label>عنوان الصفحه فى الميتا</Form.Label>
            <Form.Control
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handelChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} xs="6" controlId="formTitle">
            <Form.Label>رابط المدينة</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={formData.url}
              placeholder="يجب ان يكون فريد من نوعه"
              onChange={handelChange}
            />
          </Form.Group>

          <Form.Group as={Col} xs="6" controlId="formMetaTitle">
            <Form.Label>ميتا دسكريبشن</Form.Label>
            <Form.Control
              as="textarea"
              name="meta_description"
              value={formData.meta_description}
              onChange={handelChange}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="image" className="mb-3">
            <Form.Label>الصورة الأساسية للصفحة</Form.Label>
            <Form.Control type="file" name="image" onChange={handelChange} />
            {image && (
              <div className="mt-2">
                <h5>الصورة الأساسية</h5>
                <img
                  src={URL.createObjectURL(image)}
                  alt="MainImage"
                  style={{
                    maxWidth: "300px",
                    height: "auto",
                    margin: "0 10px 10px 0",
                    borderRadius: "5px",
                  }}
                />
              </div>
            )}
          </Form.Group>
        </Row>

        <Col className="my-2">
          <Button type="submit" disabled={load}>
            {load ? <LoadingBtn /> : "اضف المدينة"}
          </Button>
        </Col>
      </Form>

      <hr />
      <hr />

      <Form.Group controlId="governorate" className="mb-3">
        <Form.Label className="required">المحافظة</Form.Label>
        <Form.Select
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          required
        >
          {governorates.map((gov, index) => (
            <option key={gov.id} value={gov.id}>
              {gov.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {cities.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المدينة</th>
                  <th>الاسم بالانجليزى</th>
                  <th>عنوان الصفحه</th>
                  <th>الصوره</th>
                  <th>عنوان الميتا</th>
                  <th>الرابط</th>
                  <th colSpan={2} className="text-center">
                    أجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {cities.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.english_name}</td>
                    <td>{item.h1_title}</td>
                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={`صوره الصفحه`}
                          className="img-fluid w-100"
                          style={{ width: "100px", height: "70px" }}
                        />
                      ) : (
                        "لايوجد صوره"
                      )}
                    </td>
                    <td>{item.meta_title}</td>
                    <td>{item.url}</td>

                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          handleShow(item.id, cities[index]);
                        }}
                      >
                        تعديل
                      </Button>
                      <Modal
                        size="lg"
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        style={{ background: "rgba(0, 0, 0, 0.125)" }}
                      >
                        <Modal.Header>
                          <Modal.Title>تعديل المدينة</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <Form className="mt-3">
                            <Row className="mb-2">
                              <Form.Group
                                as={Col}
                                xs="6"
                                controlId="formArName"
                              >
                                <Form.Label>اسم المدينة</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={editData.name}
                                  placeholder="اسم المدينة بالعربى"
                                  onChange={handelEditeChange}
                                  required
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                xs="6"
                                controlId="formAEnName"
                              >
                                <Form.Label>اسم المدينة انجليزى</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="english_name"
                                  value={editData.english_name}
                                  placeholder="اسم المدينة بالانجليزى"
                                  onChange={handelEditeChange}
                                />
                              </Form.Group>
                            </Row>

                            <Row className="mb-2">
                              <Form.Group as={Col} xs="6" controlId="formTitle">
                                <Form.Label>العنوان الرئيسي</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="h1_title"
                                  value={editData.h1_title}
                                  onChange={handelEditeChange}
                                />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                xs="6"
                                controlId="formMetaTitle"
                              >
                                <Form.Label>عنوان الصفحه فى الميتا</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="meta_title"
                                  value={editData.meta_title}
                                  onChange={handelEditeChange}
                                />
                              </Form.Group>
                            </Row>

                            <Row className="mb-2">
                              <Form.Group as={Col} xs="6" controlId="formTitle">
                                <Form.Label>رابط المدينة</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="url"
                                  value={editData.url}
                                  placeholder="يجب ان يكون فريد من نوعه"
                                  onChange={handelEditeChange}
                                />
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs="6"
                                controlId="formMetaTitle"
                              >
                                <Form.Label>ميتا دسكريبشن</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  name="meta_description"
                                  value={editData.meta_description}
                                  onChange={handelEditeChange}
                                />
                              </Form.Group>
                            </Row>

                            <Row>
                              <Form.Group controlId="image" className="mb-3">
                                <Form.Label>الصورة الأساسية للصفحة</Form.Label>
                                <Form.Control
                                  type="file"
                                  name="image"
                                  onChange={handelEditeChange}
                                />

                                <div className="mt-2">
                                  <h5>الصورة الأساسية</h5>
                                  {newImage ? (
                                    <img
                                      src={URL.createObjectURL(newImage)}
                                      alt="MainImage"
                                      style={{
                                        maxWidth: "300px",
                                        height: "auto",
                                        margin: "0 10px 10px 0",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  ) : editData.image ? (
                                    <img
                                      src={editData.image}
                                      alt="MainImage"
                                      style={{
                                        maxWidth: "300px",
                                        height: "auto",
                                        margin: "0 10px 10px 0",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Form.Group>
                            </Row>
                          </Form>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            الغاء
                          </Button>
                          <Button
                            variant="success"
                            onClick={handleEdite}
                            disabled={loadEdit}
                          >
                            {loadEdit ? <LoadingBtn /> : " حفظ التعديل"}
                          </Button>
                        </Modal.Footer>
                        {showAlert && (
                          <>
                            <AlertMessage
                              msg={alert.msg}
                              setShow={setShowAlert}
                              variant={alert.variant}
                            />
                          </>
                        )}
                      </Modal>
                    </td>
                    <DeleteItem
                      id={selectedItemId}
                      setId={setSelectedItemId}
                      itemId={item.id}
                      DeleteFun={handleDelete}
                      load={loadId}
                    />
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert key="warning" variant="warning">
              لا يوجد مدن
            </Alert>
          )}
          {showAlert && (
            <>
              <AlertMessage
                msg={alert.msg}
                setShow={setShowAlert}
                variant={alert.variant}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
