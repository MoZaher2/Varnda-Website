import React, { useEffect, useState } from 'react';
import { Button, Table, Col, Form, InputGroup, Row, Modal } from 'react-bootstrap';
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import LoadingBtn from '../../Components/LoadingBtn.js';

function CategoryArticle() {
    const token=Cookies.get("token")
    const [category_name, setCategory_name] = useState("")
    const [load, setLoad] = useState(false)
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/getallcategories`);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEdite = async (id) => {
        console.log(newCategory);
        console.log("ID:", id);
        try {
            // const token = Cookies.get("token")
            const response = await api.post(`/categories/${id}?category_name=${newCategory}`, null, {
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
    const handleDelete = async (id, name) => {
        console.log("ID:", id, "Name:", name);
        try {
            // const token = Cookies.get("token")
            const response = await api.delete(`/delCategory/${id}`, null, {
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
// New Category
function handleNewCategory(e) {
    setNewCategory(e.target.value)
}
    //Add Category
    function handleChangeCategory(e) {
        console.log(e.target.value);
        setCategory_name(e.target.value)
    }
    const handleAddCategory = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            // const token = Cookies.get("token")
            console.log(category_name);
            const response = await api.post("/AddCategory", { category_name }, {
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
    return (

        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>اسم التصنيف</th>
                        <th>تعديل</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.category_name}</td>
                            <td>
                                <Button variant="warning" onClick={handleShow}>
                                    تعديل
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>تعديل اسم التصنيف</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Form.Control
                                            type="text"
                                            name="newCategory"
                                            onChange={handleNewCategory}
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

            <Form onSubmit={handleAddCategory}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <InputGroup className="mb-2" dir="ltr" >
                            <Form.Control id="inlineFormInputGroup" className='text-end' name="category_name" onChange={handleChangeCategory} required placeholder="اكتب اسم التصنيف" />
                        </InputGroup>
                    </Col>
                    <Col xs="4">
                        <Button type="submit" className="mb-2">
                            {load ? <LoadingBtn /> : "اضف تصنيف"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default CategoryArticle;
