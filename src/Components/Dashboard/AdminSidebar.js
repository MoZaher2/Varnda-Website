import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from "../../API/ApiLink";
export default function SideBar() {
  const token = Cookies.get("token")
  const role = Cookies.get("role")
  // const role = localStorage.getItem("role")
  const navigate = useNavigate()
  const Logout = async () => {
    try {
      const response = await api.post("/admin/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error);
    } finally {
      // localStorage.removeItem("role");
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName);
      });
      navigate("/")
    }
  }
  return (
    <>
      <nav className="sidebar">
        <div>
          <div className="nav-li w-100 d-flex ">
            <Link to="/" className="w-100 button-link">
              <Button variant="primary" className="w-100">
                الصفحة الرئيسية
              </Button>
            </Link>

            {role==='admin'&&
              <DropdownButton
              id="dropdown-basic-button"
              align="end"
              title="المستخدمين"
              className="w-100 sideDropdown"
            >
              <Dropdown.Item href="/dashboard/add-users">
                اضافه مستخدمين
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/admin">المديرين</Dropdown.Item>
              <Dropdown.Item href="/dashboard/writer">كاتب المقال</Dropdown.Item>
              <Dropdown.Item href="/dashboard/seo">فريق ال SEO</Dropdown.Item>
            </DropdownButton>}
            
            {role==='admin'&&<Link to="/dashboard/all-ads" className="w-100 button-link">
              <Button variant="primary" className="w-100">
                جميع الاعلانات
              </Button>
            </Link>}
      
            <Link to="/dashboard/category" className="w-100 button-link">
              <Button variant="primary" className="w-100">
                تصنيف المدونات
              </Button>
            </Link>

            <DropdownButton
              id="dropdown-basic-button"
              align="end"
              title="المدونات"
              className="w-100 sideDropdown"
            >
              <Dropdown.Item href="/dashboard/Blogs">عرض المدونات</Dropdown.Item>
              <Dropdown.Item href="/dashboard/Drafts">عرض المسودات</Dropdown.Item>
              <Dropdown.Item href="/dashboard/Blogs-category">
                المدونات حسب التصنيف
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/add-Blog">
                اضافه مدونة
              </Dropdown.Item>

              {role==='admin'&&<Dropdown.Item href="/dashboard/delete-unused-images">حذف الصور الغير مستخدمه</Dropdown.Item>
              }
            </DropdownButton>

            {(role==='admin'||role==='seo')&&
              <DropdownButton
              id="dropdown-basic-button"
              align="end"
              title="المناطق"
              className="w-100 sideDropdown"
            >
              <Dropdown.Item href="/dashboard/governments">
                المحافظات
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/cities">المدن</Dropdown.Item>
              <Dropdown.Item href="/dashboard/regions">المناطق</Dropdown.Item>
              <Dropdown.Item href="/dashboard/streets">الشوارع</Dropdown.Item>
              <Dropdown.Item href="/dashboard/compounds">
                الكومباوندات
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/molls">المولات</Dropdown.Item>
              </DropdownButton>
            }
      
            {/* الفلاتر */}
            {(role==='admin'||role==='seo')&&
              <DropdownButton
              id="dropdown-basic-button"
              align="end"
              title="الفلاتر"
              className="w-100 sideDropdown"
            >
              <Dropdown.Item href="/dashboard/filters">
              جميع الفلاتر
              </Dropdown.Item>
              {/* محافظات */}
              <Dropdown.Item href="/dashboard/filters/governorates">
                فلاتر المحافظات
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/filters/add-gov-filter">
                اضافه فلتر محافظة
              </Dropdown.Item>
              {/* مدن */}
              <Dropdown.Item href="/dashboard/filters/cities">
                فلاتر المدن
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/filters/add-city-filter">
                اضافه فلتر مدينة
              </Dropdown.Item>
              {/* مناطق */}
              <Dropdown.Item href="/dashboard/filters/regions">
                فلاتر المناطق
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/filters/add-region-filter">
                اضافه فلتر منطقة
              </Dropdown.Item>
      
      
      
              <Dropdown.Item href="/dashboard/filters/projects">
                فلاتر مشروعات
              </Dropdown.Item>
              <Dropdown.Item href="/dashboard/filters/add-project-filter">
                اضافه فلتر مشروع
              </Dropdown.Item>
            </DropdownButton>}
      
            <Button variant="danger" className="w-100" onClick={Logout}>
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
