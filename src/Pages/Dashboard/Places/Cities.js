import { useEffect, useState } from "react";
import { Form, Button, Table ,Modal ,Row,Col,InputGroup,Alert} from 'react-bootstrap';
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from 'js-cookie';

export default function Cities() {
    const token = Cookies.get("token")
    const [formData, setFormData] = useState({
        governorate: 1,
    });
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false);
    const [cityName, setCityName] = useState("")//اسم الحاجه اللى هضيفها
    const [governorates, setGovernorates] = useState([])
    const [newCityName, setNewCityName] = useState("");
    const [cities, setCities] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
    // تعديل المدن
    const handleEdite = async (id) => {
        try {
            const response = await api.post(`/updateCity/${id}`, {name:newCityName,governorate_id:formData.governorate}, {
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
    // حذف المحافظه
    const handleDelete = async (id, name) => {
        try {
            const response = await api.post(`/deleteCity/${id}`, null, {
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
    // اضافه محافظه
    const handleAddCities = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            const response = await api.post("/addCity", { name:cityName ,governorate_id:formData.governorate}, {
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
    function handleChangeCityName(e) {
        setCityName(e.target.value)
    }
    function handleNewCityName(e) {
        setNewCityName(e.target.value)
    }
    return (
        <>
            <Form.Group controlId="governorate" className="mb-3">
                <Form.Label className='required'>المحافظة</Form.Label>
                <Form.Select
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleChange}
                    required
                >
                    {governorates.map((gov, index) => (
                        <option key={gov.id} value={gov.id}>{gov.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
{cities.length>0?<Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>اسم المدينة</th>
                        <th>تعديل</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="warning" onClick={handleShow}>
                                    تعديل
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>تعديل اسم المدينة</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Form.Control
                                            type="text"
                                            name="newCityName"
                                            onChange={handleNewCityName}
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
            </Table>:<Alert key="warning" variant="warning">
                لا يوجد مدن
            </Alert>}
            

            <Form onSubmit={handleAddCities}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <InputGroup className="mb-2" dir="ltr" >
                            <Form.Control id="inlineFormInputGroup" className='text-end' name="cityName" onChange={handleChangeCityName} required placeholder="اكتب اسم المدينة" />
                        </InputGroup>
                    </Col>
                    <Col xs="4">
                        <Button type="submit" className="mb-2">
                            {load ? <LoadingBtn /> : "اضف مدينة"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}