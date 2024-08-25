import React, { useEffect, useState } from 'react';
import { Button, Table, Col, Form, InputGroup, Row, Modal, Alert } from 'react-bootstrap';
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import LoadingBtn from '../../Components/LoadingBtn.js';
import OverPage from './../../Components/OverPage/OverPage';
import DeleteItem from './../../Components/DeleteItem/DeleteItem';

function CategoryArticle() {
    const token=Cookies.get("token")
    console.log(token)
    const [category_name, setCategory_name] = useState("")
    const [load, setLoad] = useState(false)
    const [loadId, setLoadId] = useState(false)
    const [data, setData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [show, setShow] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const handleClose = () => setShow(false);
    const [loadEdit, setLoadEdit] = useState(false);

    const handleShow = (id, name) => {
        setSelectedItemId(id, name);
        setNewCategory(name);
        setShow(true);
      };
    const [overlay, setOverlay] = useState(false)

    // Get All Category
    const fetchData = async () => {
        try {
            setOverlay(true)
            const response = await api.get(`/getallcategories`);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally{
            setOverlay(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleEdite = async () => {
        console.log(newCategory);
        if (newCategory) {
          try {
            setLoadEdit(true);
            // const token = Cookies.get("token")
            const response = await api.post(
              `/categories/${selectedItemId}?category_name=${newCategory}`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // window.location.reload();
            fetchData();
            console.log(response.data);
          } catch (err) {
            console.log(err);
          } finally {
            setLoadEdit(false);
            setShow(false);
          }
        }
    };
    const handleDelete = async (id) => {
        setLoadId(true);
        try {
            // const token = Cookies.get("token")
            const response = await api.delete(`/delCategory/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            // window.location.reload();
            fetchData()
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }finally {
            setLoadId(false);
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
            // window.location.reload();
            fetchData()
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false)
        }
    }
    return (
      <>
        <Form onSubmit={handleAddCategory}>
          <Row className="align-items-center">
            <Col xs="8">
              <InputGroup className="mb-2" dir="ltr">
                <Form.Control
                  id="inlineFormInputGroup"
                  className="text-end"
                  name="category_name"
                  onChange={handleChangeCategory}
                  required
                  placeholder="اكتب اسم التصنيف"
                />
              </InputGroup>
            </Col>
            <Col xs="4">
              <Button type="submit" className="mb-2">
                {load ? <LoadingBtn /> : "اضف تصنيف"}
              </Button>
            </Col>
          </Row>
        </Form>
{overlay?<OverPage/>: <>
         {data.length > 0 ? (
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
                     <Button variant="warning"
                      onClick={() => {
                        handleShow(item.id, item.category_name);
                      }}
                   >
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
                           value={newCategory}
                           onChange={handleNewCategory}
                         />
                       </Modal.Body>
                       <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                           الغاء
                         </Button>
                         <Button
                           variant="primary"
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
                   {/* <td>
                     <Button
                       variant="danger"
                       onClick={() => handleDelete(item.id)}
                     >
                       حذف
                     </Button>
                   </td> */}
                 </tr>
               ))}
             </tbody>
           </Table>
         ) : (
           <Alert key="warning" variant="warning">
             لا يوجد تصنيفات
           </Alert>
         )}
       </>}
      
      </>
    );
}

export default CategoryArticle;
