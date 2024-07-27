// Save in Cookies and access it 
import Cookies from 'js-cookie';
Cookies.set('token', data.token, { expires: 30 }); // Setting token in cookie with expiry of 7 days

const getTokenFromCookie = () => {
    return Cookies.get('token');
  };

const token = getTokenFromCookie();
//////////////////////////////////////////////////////////////////////////////////
//Axios api
import api from "../../API/ApiLink.js";
const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    else{
      try {
        const response = await api.post("/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };
///////////////////////////////////////////////////////////////////////////
  import { useNavigate } from 'react-router-dom';
  function LoginPage() {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      // Navigate to the details page after login
      navigate('/details');
    };
///////////////////////////
const handelSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.stopPropagation();
  }
  else{
    try {
      const response = await api.get("/searchAds", null, {
        params: {
          mail,
          firstname
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  setValidated(true);
};

///////////
window.scrollTo({ top: 0, behavior: 'smooth' });
/////////////
// Post with Token
const response = await api.post("/updateUser", {
  ...userForm
}, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});