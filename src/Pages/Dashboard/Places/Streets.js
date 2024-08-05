import { useEffect, useState } from "react";
import { Form, Button, Table, Modal, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from 'js-cookie';

export default function Streets() {
    const token = Cookies.get("token")
    const [formData, setFormData] = useState({
        governorate: 1,
        city: "",
        region: "",
    });
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false);
    const [streetName, setStreetName] = useState("")//اسم الحاجه اللى هضيفها
    const [governorates, setGovernorates] = useState([])
    const [cities, setCities] = useState([]);
    const [newStreetName, setNewStreetName] = useState("");
    const [regions, setRegions] = useState([]);
    const [streets, setStreets] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==="governorate"){setRegions([])}
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // استرجاع المحافظات 
    useEffect(() => {
        const fetchGov = async () => {
            try {
                const response = await api.get("/governorates", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setGovernorates(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchGov();
    }, []);

    //استرجاع المدن
    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await api.get(`/governorates/${formData.governorate}/cities`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCities(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchCity();
    }, [formData.governorate]);

    // استرجاع المناطق
    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const response = await api.get(`/governorates/city/${formData.city}/regions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRegions(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchRegion();
    }, [formData.governorate,formData.city]);

    // استرجاع الشوارع
    useEffect(() => {

        const fetchStreet = async () => {
            try {
                const response = await api.get(`/streetsByRegion/${formData.region}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStreets(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchStreet();
    }, [formData.governorate,formData.city,formData.region]);


    // تعديل الشارع
    const handleEdite = async (id) => {
        try {
            const response = await api.post(`updateStreet/${id}`, { name: newStreetName, region_id: formData.region }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            window.location.reload();
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setShow(false)
        }
    };
    // حذف شارع
    const handleDelete = async (id, name) => {
        try {
            const response = await api.post(`/deleteStreet/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            window.location.reload();
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    // اضافه شارع
    const handleAddStreets = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            const response = await api.post("/addStreet", { name: streetName, region_id: formData.region }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response.data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false)
        }
    }
    function handleChangeStreetName(e) {
        setStreetName(e.target.value)
    }
    function handleNewStreetName(e) {
        setNewStreetName(e.target.value)
    }
    return (
        <>
            <Form.Group controlId="governorate" className="mb-3">
                <Form.Label>المحافظة</Form.Label>
                <Form.Select
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleChange}
                >
                    {governorates.map((gov, index) => (
                        <option key={gov.id} value={gov.id}>{gov.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="city" className="mb-3">
                <Form.Label>المدينة</Form.Label>
                <Form.Select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                >
                    <option key="choose" value="">اختر مدينه</option>
                    {cities.map((city) => (
                        <option key={city.name} value={city.id}>{city.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="region" className="mb-3">
                <Form.Label>المنطقة</Form.Label>
                <Form.Select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                >
                    <option key="choose" value="">اختر منطقه</option>
                    {regions.map((region) => (
                        <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            {streets.length > 0 ? <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>اسم المدينة</th>
                        <th>تعديل</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {streets.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="warning" onClick={handleShow}>
                                    تعديل
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>تعديل اسم الشارع</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control
                                            type="text"
                                            name="newStreetName"
                                            onChange={handleNewStreetName}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            الغاء
                                        </Button>
                                        <Button variant="primary" onClick={() => handleEdite(item.id)}>
                                            حفظ
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                    حذف
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> : <Alert key="warning" variant="warning">
                لا يوجد شوارع
            </Alert>}

            <Form onSubmit={handleAddStreets}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <InputGroup className="mb-2" dir="ltr" >
                            <Form.Control id="inlineFormInputGroup" className='text-end' name="streetName" onChange={handleChangeStreetName} required placeholder="اكتب اسم الشارع" />
                        </InputGroup>
                    </Col>
                    <Col xs="4">
                        <Button type="submit" className="mb-2">
                            {load ? <LoadingBtn /> : "اضف الشارع"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}