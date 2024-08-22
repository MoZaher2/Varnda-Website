import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Table,
  Modal,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from "js-cookie";
import OverPage from "../../../Components/OverPage/OverPage.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import DeleteItem from "../../../Components/DeleteItem/DeleteItem.js";

export default function Compounds() {
  const token = Cookies.get("token");
  const [getForm, setGetForm] = useState({
    governorate: "",
    city: "",
  });
  const [load, setLoad] = useState(false);
  const [loadId, setLoadId] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [show, setShow] = useState(false);
  const [compoundName, setCompoundName] = useState(""); //اسم الحاجه اللى هضيفها
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newCompoundName, setNewCompoundName] = useState("");
  const [compounds, setCompounds] = useState([]);
  const handleClose = () => setShow(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loadEdit, setLoadEdit] = useState(false);
  const handleShow = (id, name) => {
    setSelectedItemId(id, name);
    setNewCompoundName(name);
    setShow(true);
  };
  const handleGetChange = (e) => {
    const { name, value } = e.target;
    if (name === "governorate") {
      setGetForm({ governorate: value, city: "" });
      setCities([]);
      setCompounds([]);
    } else {
      setGetForm({
        ...getForm,
        [name]: value,
      });
    }
  };

  // استرجاع المحافظات
  useEffect(() => {
    const fetchGov = async () => {
      try {
        setOverlay(true);
        const response = await api.get("/governorates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGovernorates(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setOverlay(false);
      }
    };
    fetchGov();
  }, []);

  //استرجاع المدن
  useEffect(() => {
    const fetchCity = async () => {
      try {
        setOverlay(true);
        const response = await api.get(
          `/governorates/${getForm.governorate}/cities`,
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
    if (getForm.governorate) {
      fetchCity();
    }
  }, [getForm.governorate]);

  // استرجاع الكومباوند
  const fetchCompound = async () => {
    try {
      setOverlay(true);
      const response = await api.get(`/get_compounds_by_city/${getForm.city}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompounds(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    if (getForm.city) {
      fetchCompound();
    }
  }, [getForm.governorate, getForm.city]);
  //  تعديل الكومباوند
  const handleEdite = async (selec) => {
    if (newCompoundName) {
      try {
        setLoadEdit(true);
        const response = await api.post(
          `/update-compound/${selectedItemId}`,
          { name: newCompoundName, city_id: getForm.city },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchCompound();
        console.log(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadEdit(false);
        setShow(false);
      }
    }
  };
  // حذف كومباوند
  const handleDelete = async (id) => {
    try {
      setLoadId(true);
      const response = await api.post(`/delete-compound/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCompound();
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadId(false);
    }
  };
  // اضافه كومباوند
  const handleAddCompounds = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (getForm.city) {
      try {
        const response = await api.post(
          "/add-compound",
          { name: compoundName, city_id: getForm.city },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        fetchCompound();
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    } else {
      setAlert({ msg: "يجب تحديد مدينه لاضافه الكومباوند داخلها", variant: 3 });
      setShowAlert(true);
      setLoad(false);
    }
  };
  function handleChangeCompoundName(e) {
    setCompoundName(e.target.value);
  }
  function handleNewCompoundName(e) {
    setNewCompoundName(e.target.value);
  }
  return (
    <>
      <Form.Group controlId="governorate" className="mb-3">
        <Form.Label className="required">المحافظة</Form.Label>
        <Form.Select
          name="governorate"
          value={getForm.governorate}
          onChange={handleGetChange}
          required
        >
          <option key={0} value="">
            اختر المحافظة
          </option>
          {governorates.map((gov, index) => (
            <option key={gov.id} value={gov.id}>
              {gov.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="city" className="mb-3">
        <Form.Label className="required">المدينة</Form.Label>
        <Form.Select
          name="city"
          value={getForm.city}
          onChange={handleGetChange}
          required
        >
          <option key={0} value="">
            اختر المدينة
          </option>
          {cities.map((city) => (
            <option key={city.name} value={city.id}>
              {city.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form onSubmit={handleAddCompounds}>
        <Row className="align-items-center">
          <Col xs="8">
            <InputGroup className="mb-2" dir="ltr">
              <Form.Control
                id="inlineFormInputGroup"
                className="text-end"
                name="compoundName"
                onChange={handleChangeCompoundName}
                required
                placeholder="اكتب اسم الكومباوند"
              />
            </InputGroup>
          </Col>
          <Col xs="4">
            <Button type="submit" className="mb-2">
              {load ? <LoadingBtn /> : "اضف كومباوند"}
            </Button>
          </Col>
        </Row>
      </Form>
      {showAlert && (
        <>
          <AlertMessage
            msg={alert.msg}
            setShow={setShowAlert}
            variant={alert.variant}
          />
        </>
      )}
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {compounds.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم الكومباوند</th>
                  <th colSpan={2} className="text-center">
                    أجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {compounds.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          handleShow(item.id, item.name);
                        }}
                      >
                        تعديل
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                          <Modal.Title>تعديل اسم الكومباوند</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Control
                            type="text"
                            name="newCompoundName"
                            value={newCompoundName}
                            onChange={handleNewCompoundName}
                          />
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
              لا يوجد كومباوندات
            </Alert>
          )}
        </>
      )}
    </>
  );
}
