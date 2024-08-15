import { useEffect, useState } from "react";
import ArticleEditor from "../../../Components/Editor/Editor.js";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import Cookies from 'js-cookie';
import usePageSEO from "../../../hooks/usePageSEO.js";

export default function AddArticle() {

    const token = Cookies.get("token");

// usePageSEO({
//     title:"المدونات",
//     description:"اهلا بك فى المدونات",
//     keywords:["key1","key2","key3"]
// })

    const [article_body, setArticle_body] = useState('<h1>اكتب مقالتك هنا!</h1>');
    const [categories,setCategories]=useState([])
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ msg: "", variant: 0 });

    const [formData, setFormData] = useState({
        title: '',
        article_url: '',
        meta_description: '',
        key_words: '',
        category_id:'',
    })
    const [article_image, setArticle_image] = useState(null);

    const validateUrl = (url) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator
        return !!urlPattern.test(url);
    };

    function extractImageUrls(htmlString) {
        const urls = [];
        const regex = /<img[^>]+src="([^">]+)"/g;
        let match;
        while ((match = regex.exec(htmlString)) !== null) {
          urls.push(match[1]);
        }
        return urls;
      }
    

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (name === 'article_image') {
                setArticle_image(files[0]);
            }
        }
        else{
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // API for get Category
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

    const handelSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const imageUrls = extractImageUrls(article_body);
            // const adminId=Cookies.get("id")
            const adminId="1"
            const formDataToSend = new FormData();
            formDataToSend.append('article_image', article_image);
            formDataToSend.append('article_body', article_body);
            formDataToSend.append('admin_id', adminId);
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            // Set Post
            try {
                setLoad(true);
                const response = await api.post("/storePost", formDataToSend, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const postId= response.data.data.post_id;
                console.log("imageUrls:");
                console.log(imageUrls);
                //Confirm images url
                try{
                    const response = await api.post(`/handlingPostImages/${postId}`, {image_paths:imageUrls}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response.data);
                    setAlert({ msg: "تم نشر المدونة", variant: 1 });
                    setShow(true);
                    setTimeout(() => {
                        navigate("/dashboard/Blogs");
                    }, 2000)
                }catch(err){
                    setAlert({ msg: "حدث خطا اثناء نشر المدونة", variant: 2 });
                }
            } catch (error) {
                if(error.response.status===422){
                    setAlert({ msg: "هناك مقال اخر بهذا الرابط", variant: 2 });
                }
                console.log(error);
            } finally {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShow(true)
                setLoad(false);
            }
        }
        setValidated(true);
        };

    return (
        <>
            <Form
                className="p-4 border rounded"
                noValidate
                validated={validated}
                onSubmit={handelSubmit}
                style={{position:"relative"}}
                >
                {show && (
                    <>
                        <AlertMessage
                            msg={alert.msg}
                            setShow={setShow}
                            variant={alert.variant}
                        />
                    </>
                )}
                <Row>
                    <Col xs={8}>
                        <Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>عنوان المدونة:</Form.Label>
                                <Form.Control type="text" name="title" onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLink">
                                <Form.Label>رابط المدونة:</Form.Label>
                                <Form.Control type="text" name="article_url" placeholder="عباره عن كلمه تكون فريده من نوعها" onChange={handleChange} required />
                                {/* <Form.Control.Feedback type="invalid">
                                    يجب كتابة اسم فريد
                                </Form.Control.Feedback> */}
                            </Form.Group>

                        </Row>
                        <Form.Group as={Col} controlId="formGridMeta">
                            <Form.Label>ميتا دسكريبشن:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="ادخل الميتا دسكريبشن"
                                style={{ height: '100px' }}
                                name="meta_description"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridKeywords">
                            <Form.Label>الكلمات المفتاحية:</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="ادخل الكلمات المفتاحية: اكتب الكلمه ثم ',' فصله ثم الكلمه الاخرى على سبيل المثال: كلمه اولى , كلمه ثانيه وهكذا"
                                style={{ height: '100px' }}
                                name="key_words"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="category">
                        <Form.Label className='required'>نوع المدونة: </Form.Label>
                        <Form.Select
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">اختر نوع المدونة</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.category_name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                    </Col>
                    <Col xs={4}>
                        <Form.Group controlId="article_image" className="mb-3">
                            <Form.Label>الصورة الأساسية للمقال:</Form.Label>
                            <Form.Control
                                type="file"
                                name="article_image"
                                onChange={handleChange}
                                required
                            />
                            {article_image && (
                                <div className="mt-2">
                                    <h5>الصورة الأساسية</h5>
                                    <img
                                        src={URL.createObjectURL(article_image)}
                                        alt="articleimage"
                                        style={{ maxWidth: '300px', height: 'auto', margin: '0 10px 10px 0', borderRadius: '5px' }}
                                    />
                                </div>
                            )}
                            <Form.Control.Feedback type="invalid">
                                يجب اختيار صوره للاعلان
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>المدونة:</Form.Label>
                        <ArticleEditor setArticle_body={setArticle_body} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit" disabled={load} className="w-100 mt-2">
                    {load ? <LoadingBtn /> : "نشر المدونة"}
                </Button>
                
            </Form>
            
        </>
    );
}