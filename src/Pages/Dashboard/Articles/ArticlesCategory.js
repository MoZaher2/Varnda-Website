import { useEffect, useState } from "react";
import { Button ,Table ,Alert,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import Cookies from 'js-cookie';
import OverPage from "../../../Components/OverPage/OverPage.js";

export default function ArticlesCategory() {
    const token = Cookies.get("token");

    const [loadId, setLoadId] = useState(false)
    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState()
    const [overlay, setOverlay] = useState(false)
    
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
            setOverlay(true)
            const response = await api.get(`getPostsByCategory/${categoryName}`);
            if(response.data.data){
                setArticles(response.data.data.posts)
            }
            else{
                setArticles([])
            }
        } catch (error) {
            console.log(error);
        }finally{
            setOverlay(false)
        }
    };
    if(categoryName){
        fetchArticles();
    }
    else{
        setArticles([])
    }
    
}, [categoryName]);

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
const handleChange = (e) => {
    const { value } = e.target;
    setCategoryName(value);
}

return (
  <>
    <Form.Group controlId="category" className="mb-3">
      <Form.Label className="required">التصنيفات</Form.Label>
      <Form.Select
        name="category"
        value={categoryName}
        onChange={handleChange}
        required
      >
        <option key="choose" value="">
          اختر تصنيف
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
{overlay?<OverPage/>: <>
        {articles.length > 0 ? (
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
            <tbody>
              {articles.map((item,index) => (
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
          </Table>
        ) : (
          <Alert key="warning" variant="warning">
            لا يوجد مقالات فى هذا التصنيف
          </Alert>
        )}
    </>}

   
  </>
);
}