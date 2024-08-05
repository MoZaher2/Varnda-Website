import { useEffect, useState } from "react";
import { Form, Button, Table ,Modal ,Row,Col,InputGroup} from 'react-bootstrap';
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from 'js-cookie';
export default function Governments() {
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false);
    const [govName, setGovName] = useState("")//اسم الحاجه اللى هضيفها
    const [governorates, setGovernorates] = useState([])
    const [newGovName, setNewGovName] = useState("");
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const token = Cookies.get("token")
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
    // تعديل المحافظه
    const handleEdite = async (id) => {
        console.log(newGovName);
        console.log("ID:", id);
        try {
            const response = await api.post(`/updateGovernorate/${id}`, {name:newGovName}, {
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
            const response = await api.post(`/deleteGovernorate/${id}`, null, {
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
    const handleAddGovernments = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            const response = await api.post("/addGovernorate", { name:govName }, {
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
    function handleChangeGovName(e) {
        console.log(e.target.value);
        setGovName(e.target.value)
    }
    function handleNewGovName(e) {
        setNewGovName(e.target.value)
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>اسم المحافظة</th>
                        <th>تعديل</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {governorates.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="warning" onClick={handleShow}>
                                    تعديل
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>تعديل اسم المحافظة</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Form.Control
                                            type="text"
                                            name="newGovName"
                                            onChange={handleNewGovName}
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
            </Table>

            <Form onSubmit={handleAddGovernments}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <InputGroup className="mb-2" dir="ltr" >
                            <Form.Control id="inlineFormInputGroup" className='text-end' name="govName" onChange={handleChangeGovName} required placeholder="اكتب اسم المحافظه" />
                        </InputGroup>
                    </Col>
                    <Col xs="4">
                        <Button type="submit" className="mb-2">
                            {load ? <LoadingBtn /> : "اضف محافظة"}
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>
    );
}