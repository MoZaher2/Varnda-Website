import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import OverPage from '../../Components/OverPage/OverPage';
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const AuthGoogle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const query = new URLSearchParams(location.search);
    const errorMessage = query.get('error');
    const token = query.get('token');
    const image = query.get('image');
    const role = query.get('role');
    const email = query.get('email');
    const user_id = query.get('user_id');


useEffect(()=>{
    if (errorMessage) {
        console.log(errorMessage);
        setError(errorMessage);
    } else {
        if (token && role) {
            localStorage.setItem('role', role);
            Cookies.set('token', token);
            Cookies.set("image", image);
            Cookies.set('role', role);
            Cookies.set('email', email);
            Cookies.set("user_id", user_id);
            Cookies.set("verify", 'true')
            navigate(location.pathname, { replace: true });
            navigate('/');
        }
    }
},[errorMessage,token])


    return (
        <>
            {error &&
                <div>
                <Alert
                variant="warning"
              >
                <p>
                    هذا الحساب موجود بالفعل. قم بالتسجيل عبر الايميل وكلمه السر من هنا 
                    <Alert.Link as={Link} to="/login">
                     .  تسجيل الدخول
                    </Alert.Link>
                  .
                </p>
              </Alert>
            </div>
}
        </>
    );
};

export default AuthGoogle;