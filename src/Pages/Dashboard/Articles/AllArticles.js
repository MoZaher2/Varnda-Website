import { useEffect, useState } from "react";
import { Button ,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from "../../../API/ApiLink";
export default function AllArticles() {
    const token = Cookies.get("token");
  

    // const [load, setLoad] = useState(false)
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [articles, setArticles] = useState([])
    

// استرجاع المدونات 
useEffect(() => {
    const fetchArticles = async () => {
        try {
            const response = await api.get("/getAllPosts");
            setArticles(response.data.data.posts)
        } catch (error) {
            console.log(error);
        }
    };
    fetchArticles();
}, []);

// حذف المدونة
const handleDelete = async (id) => {
    try {
        const response = await api.delete(`deletePost/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
};

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
                    <th>حذف</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.Title}</td>
                        <td>{item.meta_description}</td>
                        <td>{item.key_words}</td>
                        <td>
                        <Link to={`/Blog/${item.Article_url}`}>
                            {item.Article_url}
                        </Link>
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
    </>
);
}