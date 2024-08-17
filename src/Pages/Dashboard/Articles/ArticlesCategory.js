import { useEffect, useState } from "react";
import { Button ,Table ,Alert,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import Cookies from 'js-cookie';

export default function ArticlesCategory() {
    const token = Cookies.get("token");

    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [category_id, setCategory_id] = useState()
    
    // استرجاع التصنيفات 
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get("/getallcategories");
                setCategories(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategory();
    }, []);

// استرجاع المدونات 
useEffect(() => {
    const fetchArticles = async () => {
        try {
            console.log(category_id);
            const response = await api.get(`getPostsByCategory/${category_id}`);
            setArticles(response.data.data.posts)
        } catch (error) {
            console.log(error);
        }
    };
    if(category_id){
        fetchArticles();
    }
    
}, [category_id]);

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
const handleChange = (e) => {
    const { value } = e.target;
    setCategory_id(value);
}


return (
    <>
     <Form.Group controlId="governorate" className="mb-3">
                <Form.Label className='required'>التصنيفات</Form.Label>
                <Form.Select
                    name="governorate"
                    value={category_id}
                    onChange={handleChange}
                    required
                >
                    <option key="choose" value="">اختر تصنيف</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.category_name}</option>
                    ))}
                </Form.Select>
            </Form.Group>

    {articles.length>0? <Table striped bordered hover>
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
                            {/* لازم اغير اللينك هنا للينك الاصلى للمقالات */}
                        <Link to={`/dashboard/${item.Article_url}`}>
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
        </Table>:<Alert key="warning" variant="warning">
                لا يوجد مقالات فى هذا التصنيف
            </Alert>}
       
    </>
);
}