import { useEffect, useState } from "react";
import { Button ,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from "../../../API/ApiLink";
import OverPage from "../../../Components/OverPage/OverPage";
import LoadingBtn from "../../../Components/LoadingBtn";
export default function AllDrafts() {
    const token = Cookies.get("token");
  

    const [overlay, setOverlay] = useState(false)
    const [loadId, setLoadId] = useState(false)
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [articles, setArticles] = useState([])
    

// استرجاع المسودات 
useEffect(() => {
    const fetchArticles = async () => {
        try {
            setOverlay(true)
            const response = await api.get("/getDraftPosts",{
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
            setArticles(response.data.data.posts)
        } catch (error) {
            console.log(error);
        }finally{
            setOverlay(false)
        }
    };
    fetchArticles();
}, []);

   // حذف المسودة
   const handleDelete = async (id) => {
    try {
        setLoadId(id);
        await api.delete(`deletePost/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        window.location.reload();
    } catch (err) {
        console.log(err);
    } finally {
      setLoadId(null);
    }
};


return (
  <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>عنوان المسودة</th>
          <th>الميتا دسكريبشن</th>
          <th>الكلمات المفتاحيه</th>
          <th colSpan={2} className="text-center">
            أجراءات
          </th>
        </tr>
      </thead>
      {overlay ? (
        <OverPage />
      ) : (
        <tbody>
          {articles.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.Title}</td>
              <td>{item.meta_description}</td>
              <td>{item.key_words}</td>
              <td>
                <Button
                  variant="warning"
                  as={Link}
                  to="/dashboard/edit-Blog"
                  state={{ data: articles[index] }}
                >
                  تعديل
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  disabled={loadId === item.id}
                  onClick={() => handleDelete(item.id)}
                >
                  {loadId === item.id ? <LoadingBtn /> : "حذف"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  </>
);
}