import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../Components/Header/Header";
import Footer from '../../Components/Footer/Footer';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Form, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDollarSign, faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import { AllGovernments } from '../../utility/AllGovernments';
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import "./AddApartmentsAndDuplexesPage.css"
import LoadingBtn from "../../Components/LoadingBtn.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import { useNavigate } from 'react-router-dom';
const AddApartmentsAndDuplexesPage = () => {

    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ msg: "", variant: 0 })
    const navigate = useNavigate();

    const myIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        shadowSize: [41, 41],
    });

    const [formData2, setFormData2] = useState({
        property_id: "",
        advertiser_type: "",
        phone: Cookies.get('phone'),
        email: Cookies.get('email'),
        whats_phone: Cookies.get('whats_phone')
    })
    const [formData, setFormData] = useState({
        user_id: Cookies.get("user_id"),//👍
        category: 'شقق',//👍
        name_ad_ar: '',//👍
        details_ar: '',//👍
        type: '',//👍
        price: '',//👍
        discount: '',//👍
        payment_method: '',//👍
        rent_type: '',//👍
        legal_papers: '',//👍
        area: '',//👍
        rooms: '',//👍
        bathrooms: '',//👍
        floor_number: '',//👍
        compound_name: '',//👍
        primary_picture: '',//👍  
        'images[]': '',//👍
        video_link: '',//👍
        full_address: '',//👍
        governorate: '',//👍
        city: '',//👍
        region: '',//👍
        street: '',//👍
        deliver_date: '',//👍
        finishing_type: '',//👍
        furnished: '',//👍
        'facilities[]': [],//👍
        'features[]': [],//👍
        'services[]': [],//👍
        'devices[]': [],//👍
    });
    const [primary_picture, setPrimary_picture] = useState(null);
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [streets, setStreets] = useState([]);
    const [compounds, setCompounds] = useState([{ id: 1, name: "com1" }, { id: 2, name: "com2" }]);
    const [position, setPosition] = useState([30.044376903556085, 31.235749743857397]);//ابعته ف ال API  latitude longitude
    const [validated, setValidated] = useState(false);
    const [validated2, setValidated2] = useState(false);

    const categories = {
        مرافق: ["عداد كهرباء", "عداد مياه", "غاز طبيعي", "تليفون أرضي"],
        ميزات: ["شرفة", "غرف خدم", "غرفة غسيل", "غرفة ملابس", "حديقة خاصة", "موقف سيارات مغطي"],
        خدمات: ["حمام سباحة", "أسانسير", "أمن"],
        أجهزة: ["تدفئة", "تكييف", "اجهزة المطبخ", "أجهزة كشف الحريق"]
    };

    const [governorates, setGovernorates] = useState(AllGovernments)
    // API for get data to choose from it
    useEffect(() => {
        const fetchGov = async () => {
            try {
                const token = Cookies.get('token');
                const response = await api.get("/governorates", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGovernorates(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchGov();
    }, []);
    //City
    useEffect(() => {
        const fetchCity = async () => {
            const govId = governorates.find((e) => {
                return e.name === formData.governorate
            })["id"]

            try {
                const token = Cookies.get('token');
                const response = await api.get(`/governorates/${govId}/cities`, {
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

    // Region
    useEffect(() => {

        const fetchCity = async () => {
            const cityId = cities.find((e) => {
                return e.name === formData.city
            })["id"]
            try {
                const token = Cookies.get('token');
                const response = await api.get(`/governorates/city/${cityId}/regions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRegions(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchCity();
    }, [formData.city]);
    // Street
    useEffect(() => {

        const fetchStreet = async () => {
            const streetId = regions.find((e) => {
                return e.name === formData.region
            })["id"]
            try {
                const token = Cookies.get('token');
                const response = await api.get(`/streetsByRegion/${streetId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data)
                setStreets(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchStreet();
    }, [formData.region]);


    const isValidPhone = (phoneNumber) => {
        const egPhone = /^(010|011|012|015)\d{8}$/;
        return egPhone.test(phoneNumber);
    };




    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (name === "video_link") {
            if (!validateUrl(value)) {
                e.target.setCustomValidity("يرجى إدخال رابط صحيح");
            } else {
                e.target.setCustomValidity("");
            }
        }

        if (type === 'file') {
            if (name === 'primary_picture') {
                setPrimary_picture(files[0]);
            } else if (name === 'images[]') {
                setImages(Array.from(files));
                console.log(images)
            }
            setFormData({
                ...formData,
                [name]: files,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }


    };
    const fieldMapping = {
        "مرافق": "facilities[]",
        "ميزات": "features[]",
        "خدمات": "services[]",
        "أجهزة": "devices[]"
    };
    const toggleAmenity = (category, amenity) => {

        const fieldName = fieldMapping[category];

        setFormData(prevState => ({
            ...prevState,
            [fieldName]: prevState[fieldName].includes(amenity)
                ? prevState[fieldName].filter(item => item !== amenity)
                : [...prevState[fieldName], amenity]
        }));
        console.log(formData['facilities[]'])
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            if (!isValidPhone(value)) {
                e.target.setCustomValidity("يرجى إدخال رقم هاتف صحيح");
            } else {
                e.target.setCustomValidity("");
            }
        }
        setFormData2({ ...formData2, [name]: value })
    }


    const fetchAddress = async (lat, lng) => {
        const apiKey = 'ede130c0ba4f4355b0e56461701f0455';
        try {
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`);
            console.log(response);
            const address = response.data.features[0].properties.formatted;
            setFormData({
                ...formData,
                full_address: address,
            });
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    function MyComponent() {
        useMapEvents({
            click: (e) => {
                setPosition([e.latlng.lat, e.latlng.lng]);
                fetchAddress(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !formData.primary_picture) {
            e.stopPropagation();
            setAlert({ msg: "يرجى التأكد من ملئ الحقول المطلوبه *", variant: 3 })
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShow(true)
        }
        else {
            setLoad1(true)
            const token = Cookies.get("token")
            try {
                const allFormData = new FormData();

                // Append other form fields
                for (const [key, value] of Object.entries(formData)) {
                    allFormData.append(key, value);
                }
                // Append images
                if (images) {
                    for (let i = 0; i < images.length; i++) {
                        allFormData.append('images[]', formData['images[]'][i]);
                    }
                }

                if (primary_picture) {
                    allFormData.append('primary_picture', formData.primary_picture[0]);
                }

                // Append position
                allFormData.append('latitude', position[0]);
                allFormData.append('longitude', position[1]);

                // Post the data
                const response = await api.post("/AddProperties", allFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const prop_id = response.data.data.Property.property_id
                setFormData2({ ...formData2, "property_id": prop_id })
                // للانتقال لاخر صفحه و حفظ الاعلان
                setCurrentPage(currentPage + 1);
            } catch (err) {
                console.log(err)
            }
            setLoad1(false)
        }
        setValidated(true);
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setAlert({ msg: "يرجى التأكد من ملئ الحقول المطلوبه *", variant: 3 })
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShow(true)
        }
        else {
            setLoad2(true)
            const token = Cookies.get("token")
            try {
                const response = await api.post("/makeAd", {
                    ...formData2
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAlert({ msg: "تم حفظ الإعلان بنجاح", variant: 1 })
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShow(true)
                setTimeout(() => {
                    navigate('/submit-property');
                }, 2000)
                console.log(response.data)
            } catch (err) {
                console.log(err)
            }
            setLoad2(false)
        }
        setValidated2(true);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = 8; // Total number of form pages

    // Calculate progress percentage
    const progress = Math.ceil((currentPage / totalPages) * 100);




    const validateUrl = (url) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator
        return !!urlPattern.test(url);
    };


    return (
        <>
            <Header />
            <Container fluid className="px-0">
                <div className="bg-primary text-white py-3 mb-4">
                    <h1 className="text-center mb-0">
                        {currentPage === 8 ? "إضافة معلومات التواصل" : "إضافة إعلان جديد"}
                    </h1>
                </div>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={10} lg={8}>
                            <div className="shadow-sm p-4 mb-5 bg-white rounded">
                                <h2 className="text-center mb-4">شقق و دوبلكس</h2>
                                {/* <UploadWidget /> */}
                                <ProgressBar now={progress} label={`${progress}%`} className="my-4" />

                                <Form noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit1}>
                                    {currentPage === 1 && (
                                        <>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="name_ad_ar" className="mb-3">
                                                        <Form.Label className='required'>
                                                            <FontAwesomeIcon icon={faHome} className="me-2" />
                                                            اسم الإعلان
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="name_ad_ar"
                                                            value={formData.name_ad_ar}
                                                            onChange={handleChange}
                                                            maxLength="70"
                                                            required
                                                        />

                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="type" className="mb-3">
                                                        <Form.Label className='required'>هدف الإعلان</Form.Label>
                                                        <Form.Select
                                                            name="type"
                                                            value={formData.type}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">اختر الهدف</option>
                                                            <option value="rent">إيجار</option>
                                                            <option value="sale">بيع</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group controlId="details_ar" className="mb-3">
                                                <Form.Label className='required'>أضف تفاصيل العقار</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name="details_ar"
                                                    value={formData.details_ar}
                                                    onChange={handleChange}
                                                    maxLength="4000"
                                                    required
                                                />
                                            </Form.Group>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="price" className="mb-3">
                                                        <Form.Label>
                                                            <FontAwesomeIcon
                                                                icon={faDollarSign}
                                                                className="me-2"
                                                            />
                                                            سعر الوحدة
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="price"
                                                            value={formData.price}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="discount" className="mb-3">
                                                        <Form.Label>خصم حصري (إن وجد)</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="discount"
                                                            value={formData.discount}
                                                            onChange={handleChange}
                                                            placeholder='ادخل نسبه الخصم'
                                                            min={0}
                                                            max={99.9}
                                                            step={0.1}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            ادخل نسبه مئويه صحيحه (0-99.9)
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <div className="text-center d-flex justify-content-end">
                                                <Button variant="secondary" onClick={handleNextPage}>
                                                    الصفحة التالية
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                    {currentPage === 2 && (
                                        <>
                                            <Form.Group controlId="unitType" className="mb-3">
                                                <Form.Label>نوع الوحدة</Form.Label>
                                                <Form.Select
                                                    name="unitType"
                                                    value={formData.unitType}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">اختر</option>
                                                    <option value="apartment">شقة</option>
                                                    <option value="duplex">دوبلكس</option>
                                                    <option value="penthouse">بنتهاوس</option>
                                                    <option value="studio">ستوديو</option>

                                                </Form.Select>
                                            </Form.Group>

                                            {formData.type === 'rent' && (
                                                <Form.Group controlId="rent_type" className="mb-3">
                                                    <Form.Label>نوع الايجار</Form.Label>
                                                    <Form.Select
                                                        name="rent_type"
                                                        value={formData.rent_type}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">اختر</option>
                                                        <option value="1">شهرى</option>
                                                        <option value="3">ربع ثانوى</option>
                                                        <option value="6">نصف ثانوى</option>
                                                        <option value="12">ثانوى</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            )}
                                            {formData.type === 'sale' && (
                                                <>
                                                    <Form.Group controlId="payment_method" className="mb-3">
                                                        <Form.Label>طريقة الدفع</Form.Label>
                                                        <Form.Select
                                                            name="payment_method"
                                                            value={formData.payment_method}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">اختر</option>
                                                            <option value="كاش">كاش</option>
                                                            <option value="تقسيط">تقسيط</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group controlId="deliver_date" className="mb-3">
                                                        <Form.Label>تاريخ التسليم</Form.Label>
                                                        <Form.Select
                                                            name="deliver_date"
                                                            value={formData.deliver_date}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">اختر</option>
                                                            <option value="immediate">استلام فوري</option>
                                                            {Array.from({ length: 9 }, (_, i) => new Date().getFullYear() + i).map(
                                                                (year) => (
                                                                    <option key={year} value={year}>
                                                                        {year}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group controlId="legal_papers" className="mb-3">
                                                        <Form.Label>الأوراق القانونية للعقار</Form.Label>
                                                        <Form.Select
                                                            name="legal_papers"
                                                            value={formData.legal_papers}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">اختر</option>
                                                            <option value="licensed">مرخص</option>
                                                            <option value="licensable">قابل للترخيص</option>
                                                            <option value="unlicensed">غير مرخص</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </>
                                            )}
                                            <div className="text-center d-flex justify-content-between">
                                                <Button variant="secondary" onClick={handlePreviousPage} className="me-2">
                                                    الصفحة السابقة
                                                </Button>
                                                <Button variant="secondary" onClick={handleNextPage}>
                                                    الصفحة التالية
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                    {currentPage === 3 && (
                                        <>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="area" className="mb-3">
                                                        <Form.Label>
                                                            <FontAwesomeIcon
                                                                icon={faRulerCombined}
                                                                className="me-2"
                                                            />
                                                            المساحة (م2)
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="area"
                                                            value={formData.area}
                                                            onChange={handleChange}
                                                            min={2}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="rooms" className="mb-3">
                                                        <Form.Label>
                                                            <FontAwesomeIcon icon={faBed} className="me-2" />
                                                            عدد غرف النوم
                                                        </Form.Label>
                                                        <Form.Select
                                                            name="rooms"
                                                            value={formData.rooms}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">اختر</option>
                                                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                                                (number) => (
                                                                    <option key={number} value={number}>
                                                                        {number}
                                                                    </option>
                                                                )
                                                            )}
                                                            <option value="10+">+10</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="bathrooms" className="mb-3">
                                                        <Form.Label>
                                                            <FontAwesomeIcon icon={faBath} className="me-2" />
                                                            عدد الحمامات
                                                        </Form.Label>
                                                        <Form.Select
                                                            name="bathrooms"
                                                            value={formData.bathrooms}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">اختر</option>
                                                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                                                (number) => (
                                                                    <option key={number} value={number}>
                                                                        {number}
                                                                    </option>
                                                                )
                                                            )}
                                                            <option value="10+">+10</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId="floor_number" className="mb-3">
                                                        <Form.Label>الدور</Form.Label>
                                                        <Form.Select
                                                            name="floor_number"
                                                            value={formData.floor_number}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">اختر</option>
                                                            <option value="0">أرضي</option>
                                                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                                                (floor_number) => (
                                                                    <option key={floor_number} value={floor_number}>
                                                                        {floor_number}
                                                                    </option>
                                                                )
                                                            )}
                                                            <option value="ground">+10</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group controlId="finishing_type" className="mb-3">
                                                <Form.Label>مرحلة التشطيب</Form.Label>
                                                <Form.Select
                                                    name="finishing_type"
                                                    value={formData.finishing_type}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">اختر</option>
                                                    <option value="علي الطوب">علي الطوب</option>
                                                    <option value="محارة وحلوق">محارة وحلوق</option>
                                                    <option value="نصف تشطيب">نصف تشطيب</option>
                                                    <option value="تشطيب كامل">تشطيب كامل</option>
                                                    <option value="تشطيب بالأجهزة">تشطيب بالأجهزة</option>
                                                </Form.Select>
                                            </Form.Group>
                                            {(formData.finishing_type === "تشطيب بالأجهزة" || formData.finishing_type === "تشطيب كامل") &&
                                                <Form.Group controlId="furnished" className="mb-3">
                                                    <Form.Label>مفروش</Form.Label>
                                                    <Form.Select
                                                        name="furnished"
                                                        value={formData.furnished}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">اختر</option>
                                                        <option value="1">نعم</option>
                                                        <option value="0">لا</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            }
                                            <div className="text-center d-flex justify-content-between">
                                                <Button variant="secondary" onClick={handlePreviousPage} className="me-2">
                                                    الصفحة السابقة
                                                </Button>
                                                <Button variant="secondary" onClick={handleNextPage}>
                                                    الصفحة التالية
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                    {currentPage === 4 && (
                                        <>

                                            <Container className="amenities-container">
                                                {Object.entries(categories).map(([category, items]) => (
                                                    <div key={category} className="category-section">
                                                        <h5>{category}</h5>
                                                        <Row>
                                                            {items.map(item => (
                                                                <Col key={item} xs="auto" className="mb-2">
                                                                    <Button
                                                                        variant={formData[fieldMapping[category]].includes(item) ? "primary" : "outline-secondary"}
                                                                        onClick={() => toggleAmenity(category, item)}
                                                                        className="amenity-button"
                                                                    >
                                                                        {item}
                                                                    </Button>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </div>
                                                ))}
                                            </Container>

                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <Button variant="secondary" onClick={handlePreviousPage} className="me-2">
                                                    الصفحة السابقة
                                                </Button>
                                                <Button variant="secondary" onClick={handleNextPage}>
                                                    الصفحة التالية
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                    {currentPage === 5 && (
                                        <>



                                            <>
                                                <Form.Group controlId="primary_picture" className="mb-3">
                                                    <Form.Label>الصورة الأساسية للإعلان</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="primary_picture"
                                                        onChange={handleChange}
                                                    />
                                                    {primary_picture && (
                                                        <div className="mt-2">
                                                            <h5>الصورة الأساسية</h5>
                                                            <img
                                                                src={URL.createObjectURL(primary_picture)}
                                                                alt="Main Image"
                                                                style={{ maxWidth: '300px', height: 'auto', margin: '0 10px 10px 0', borderRadius: '5px' }}
                                                            />
                                                        </div>
                                                    )}
                                                    <Form.Control.Feedback type="invalid">
                                                        يجب اختيار صوره للاعلان
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group controlId="images[]" className="mb-3">
                                                    <Form.Label>قم بتحميل باقي الصور</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="images[]"
                                                        onChange={handleChange}
                                                        multiple
                                                    />
                                                    {images.length > 0 && (
                                                        <div className="mt-2">
                                                            <h5>الصور الإضافية</h5>
                                                            <div className="d-flex flex-wrap">
                                                                {images.map((image, index) => (
                                                                    <img
                                                                        key={index}
                                                                        src={URL.createObjectURL(image)}
                                                                        alt={`Additional Image ${index}`}
                                                                        style={{ maxWidth: '150px', height: 'auto', margin: '0 10px 10px 0', borderRadius: '5px' }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Form.Group>

                                                <div className="text-center d-flex justify-content-between">
                                                    <Button variant="secondary" onClick={handlePreviousPage} className="me-2">
                                                        الصفحة السابقة
                                                    </Button>
                                                    <Button variant="secondary" onClick={handleNextPage}>
                                                        الصفحة التالية
                                                    </Button>
                                                </div>
                                            </>
                                        </>
                                    )}
                                    {currentPage === 6 && (
                                        <>
                                            <Form.Group controlId="video_link" className="mb-3">
                                                <Form.Label>رابط فيديو لعرض العقار</Form.Label>
                                                <Form.Control
                                                    type="url"
                                                    name="video_link"
                                                    value={formData.video_link}
                                                    onChange={handleChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    اكتب رابط بشكل صحيح
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="full_address" className="mb-3">
                                                <Form.Label className='required'>العنوان بالكامل</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="full_address"
                                                    value={formData.full_address}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <span>اضغط على العلامة الزرقاء فى مكان موقع العقار.</span>


                                            <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                />
                                                <Marker position={position} icon={myIcon}>
                                                    <Popup>
                                                        {formData.full_address}
                                                    </Popup>
                                                </Marker>
                                                <MyComponent />
                                            </MapContainer>
                                            <div className="text-center  d-flex justify-content-between mt-5 ">
                                                <Button variant="secondary" onClick={handlePreviousPage} className="me-2">
                                                    الصفحة السابقة
                                                </Button>
                                                <Button variant="secondary" onClick={handleNextPage}>
                                                    الصفحة التالية
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                    {currentPage === 7 && (
                                        <>
                                            <Form.Group controlId="governorate" className="mb-3">
                                                <Form.Label className='required'>المحافظة</Form.Label>
                                                <Form.Select
                                                    name="governorate"
                                                    value={formData.governorate}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">اختر المحافظة</option>
                                                    {governorates.map((gov, index) => (
                                                        <option key={gov.id} value={gov.name}>{gov.name}</option>
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
                                                    <option value="">اختر المدينة</option>
                                                    {cities.map((city) => (
                                                        <option key={city.name} value={city.name}>{city.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group controlId="region" className="mb-3">
                                                <Form.Label>المنطقة</Form.Label>
                                                <Form.Select
                                                    name="region"
                                                    value={formData.region}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">اختر المنطقة</option>
                                                    {regions.map((region) => (
                                                        <option key={region.id} value={region.name}>{region.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group controlId="street" className="mb-3">
                                                <Form.Label>الشارع</Form.Label>
                                                <Form.Select
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">اختر الشارع</option>
                                                    {streets.map((street) => (
                                                        <option key={street.id} value={street.name}>{street.name}</option>
                                                    ))}
                                                </Form.Select>
                                                {/* فى حاله عدم وجود شارع */}
                                                <Form.Control
                                                    className='mt-3'
                                                    type="text"
                                                    name="street"
                                                    placeholder='فى حاله عدم وجود الشارع يرجى كتابته هنا'
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                    maxLength="30"
                                                />
                                            </Form.Group>


                                            <Form.Group controlId="compound" className="mb-3">
                                                <Form.Label>الكومباوند (إن وجد)</Form.Label>
                                                <Form.Select
                                                    name="compound_name"
                                                    value={formData.compound_name}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">اختر الكومباوند</option>
                                                    {compounds.map((compound) => (
                                                        <option key={compound.id} value={compound.name}>{compound.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <div className="text-center d-flex justify-content-between">
                                                <Button variant="secondary" onClick={handlePreviousPage} className="me-2">
                                                    الصفحة السابقة
                                                </Button>
                                                <Button variant="primary" type="submit" disabled={load1}>
                                                    {load1 ? <LoadingBtn /> : "تجهيز الاعلان "}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                                {currentPage === 8 && (
                                    <>
                                        <Form noValidate
                                            validated={validated2} onSubmit={handleSubmit2}>
                                            <Form.Group controlId="phone" className="mb-3">
                                                <Form.Label>رقم الهاتف للتواصل</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="phone"
                                                    value={formData2.phone}
                                                    onChange={handleChange2}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="whatsapp" className="mb-3">
                                                <Form.Label>رقم الواتس اب</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="whats_phone"
                                                    value={formData2.whats_phone}
                                                    onChange={handleChange2}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" className="mt-3">
                                                <Form.Label className="fs-5 mb-3">البريد الإلكتروني</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData2.email}
                                                    placeholder="ادخل البريد الإلكتروني"
                                                    onChange={handleChange2}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    ادخل الايميل بشكل صحيح
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group controlId="formUserType">
                                                <Form.Label className='mt-2'>نوع المستخدم</Form.Label>
                                                <Form.Select
                                                    name="advertiser_type"
                                                    value={formData2.advertiser_type}
                                                    onChange={handleChange2}
                                                    required
                                                >
                                                    <option value="">اختر</option>
                                                    <option key="1" value="مالك">مالك</option>
                                                    <option key="2" value="سماسر ">سمسار</option>
                                                    <option key="3" value="شركة تسويق">شركة تسويق</option>
                                                    <option key="4" value="شركة عقارية">شركة عقارية</option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    الرجاء اختيار نوع المستخدم.
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <div className="text-center d-flex justify-content-center mt-4">
                                                <Button variant="primary" type="submit" disabled={load2}>
                                                    {load2 ? <LoadingBtn /> : "حفظ الإعلان"}
                                                </Button>
                                            </div>
                                        </Form>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
                {show && <>
                    <AlertMessage msg={alert.msg} setShow={setShow} variant={alert.variant} />
                </>}
            </Container >
            <Footer />
        </>
    );
};

export default AddApartmentsAndDuplexesPage;
