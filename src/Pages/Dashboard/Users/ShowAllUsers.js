import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";
import api from "../../../API/ApiLink";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import OverPage from "../../../Components/OverPage/OverPage.js";
import { Avatar } from "@mui/joy";

export default function ShowAllUsers({ role }) {
  const [overlay, setOverlay] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  // استرجاع كل المستخدمين
  useEffect(() => {
    const handelAllAds = async () => {
      try {
        setOverlay(true);
        const response = await api.get(`/admin/getAllUsers?role=${role}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data.data);
      } catch (err) {
        try {
          const errdata = err.response.data;
          if (err.response.status == 401) {
            setAlert({
              msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
              variant: 3,
            });
            setShow(true);
            setTimeout(() => {
              localStorage.removeItem("role");
              Object.keys(Cookies.get()).forEach(function (cookieName) {
                Cookies.remove(cookieName);
              });
            }, 2000);
            navigator("/admin-login");
          }
          console.log(errdata);
        } catch (err) {
          setAlert({ msg: "حدث خطأ. تاكد من الاتصال بالانترنت", variant: 2 });
          setShow(true);
        }
      } finally {
        setOverlay(false);
      }
    };
    handelAllAds();
  }, []);

  // حذف مستخدم
  const handleDelete = async (role, email) => {
    try {
      setLoad(true);
      const dataToSend = new FormData();
      dataToSend.append("role", role);
      dataToSend.append("email", email);
      const response = await api.post(`admin/deleteUser`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      try {
        const errdata = err.response.data;
        if (err.response.status == 401) {
          setAlert({
            msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
            variant: 3,
          });
          setShow(true);
          setTimeout(() => {
            localStorage.removeItem("role");
            Object.keys(Cookies.get()).forEach(function (cookieName) {
              Cookies.remove(cookieName);
            });
          }, 2000);
          navigator("/admin-login");
        }
        console.log(errdata);
      } catch (err) {
        setAlert({ msg: "حدث خطأ. تاكد من الاتصال بالانترنت", variant: 2 });
        setShow(true);
      }
    } finally {
      setLoad(false);
    }
  };
  return (
    <>
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {data.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المستخدم</th>
                  <th>الايميل</th>
                  <th>رقم الهاتف</th>
                  <th>صوره المستخدم</th>
                  <th>دور المستخدم</th>
                  <th>أجراءات</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={item.image}
                        sx={{ "--Avatar-size": "3rem" }}
                      />
                    </td>
                    <td>{item.role}</td>
                    <td>
                      <Button
                        variant="danger"
                        disabled={load}
                        onClick={() => handleDelete(item.role, item.email)}
                      >
                        {load ? <LoadingBtn /> : "حذف"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert key="warning" className="text-center" variant="warning">
              لا يوجد مستخدمين
            </Alert>
          )}
          {/*  */}
          {show && (
            <>
              <AlertMessage
                msg={alert.msg}
                setShow={setShow}
                variant={alert.variant}
              />
            </>
          )}
          {/*  */}
        </>
      )}
    </>
  );
}
