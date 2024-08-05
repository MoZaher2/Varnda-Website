import { useEffect, useState } from "react";
import { Form, Button, Table ,Modal ,Row,Col,InputGroup,Alert} from 'react-bootstrap';
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from 'js-cookie';

export default function Molls() {
    const token = Cookies.get("token")
    const [formData, setFormData] = useState({
        governorate: 1,
        city:150,
    });
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false);
    const [mollName, setMollName] = useState("")//اسم الحاجه اللى هضيفها
    const [governorates, setGovernorates] = useState([])
    const [cities, setCities] = useState([]);
    const [newMollName, setNewMollName] = useState("");
    const [molls, setMolls] = useState([]);
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
                const response = await api.get("/governorates",{
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

    // استرجاع المولات
    useEffect(() => {
        const fetchMoll = async () => {
            try {
                const response = await api.get(`/get_malls_by_city/${formData.city}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMolls(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchMoll();
    }, [formData.governorate,formData.city]);
    // تعديل الكومباوند
    const handleEdite = async (id) => {
        try {
            const response = await api.post(`/update-mall`, {name:newMollName,city_id:formData.city,mall_id:id}, {
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
    // حذف كومباوند
    const handleDelete = async (id, name) => {
        try {
            const response = await api.post(`/delete-mall/${id}`, null, {
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
    // اضافه كومباوند
    const handleAddCities = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            const response = await api.post("/add-mall", { name:mollName ,city_id:formData.city}, {
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
    function handleChangeMollName(e) {
        setMollName(e.target.value)
    }
    function handleNewMollName(e) {
        setNewMollName(e.target.value)
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
            <Form.Group controlId="city" className="mb-3">
                <Form.Label className='required'>المدينة</Form.Label>
                <Form.Select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                >
                    {cities.map((city) => (
                        <option key={city.name} value={city.id}>{city.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
{molls.length>0?<Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>اسم المول</th>
                        <th>تعديل</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {molls.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="warning" onClick={handleShow}>
                                    تعديل
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>تعديل اسم المول</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control
                                            type="text"
                                            name="newMollName"
                                            onChange={handleNewMollName}
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
                لا يوجد مولات
            </Alert>}
            

            <Form onSubmit={handleAddCities}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <InputGroup className="mb-2" dir="ltr" >
                            <Form.Control id="inlineFormInputGroup" className='text-end' name="mollName" onChange={handleChangeMollName} required placeholder="اكتب اسم المول" />
                        </InputGroup>
                    </Col>
                    <Col xs="4">
                        <Button type="submit" className="mb-2">
                            {load ? <LoadingBtn /> : "اضف مول"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}