import { useEffect, useState } from "react";
import { Button ,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from "../../../API/ApiLink";
import OverPage from "../../../Components/OverPage/OverPage";
import LoadingBtn from "../../../Components/LoadingBtn";
export default function AllArticles() {
    const token = Cookies.get("token");
  

    const [overlay, setOverlay] = useState(false)
    const [loadId, setLoadId] = useState(false)
    // const [load, setLoad] = useState(false)
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [articles, setArticles] = useState([])
    

// استرجاع المدونات 
useEffect(() => {
    const fetchArticles = async () => {
        try {
            setOverlay(true)
            const response = await api.get("/getAllPosts");
            setArticles(response.data.data.posts)
        } catch (error) {
            console.log(error);
        }finally{
            setOverlay(false)
        }
    };
    fetchArticles();
}, []);

// حذف المدونة
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

// const handleDelete = async (id) => {
//     try {
//         const response = await api.delete(`deletePost/${id}`,{
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         })
//         window.location.reload();
//     } catch (err) {
//         console.log(err);
//     }
// };

return (
  <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>عنوان المدونة</th>
          <th>الميتا دسكريبشن</th>
          <th>الكلمات المفتاحيه</th>
          <th>رابط المدونة</th>
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
                <Link to={`/Blog/${item.Article_url}`}>{item.Article_url}</Link>
              </td>
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