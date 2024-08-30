import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from "../../API/ApiLink";
export default function SideBar() {
  const token = Cookies.get("token")
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
      localStorage.removeItem("role");
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName);
      });
      navigate("/")
    }
  }
  return (
    <nav className="sidebar">
      <div>
        {/* <div className="nav-ul"> */}
        <div className="nav-li w-100 d-flex">
          <Link to="/" className="w-100 button-link">
            <Button variant="primary" className="w-100">
              الصفحة الرئيسية
            </Button>
          </Link>
          {/*  */}
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
          </DropdownButton>
          {/*  */}
          <Link to="/dashboard/all-ads" className="w-100 button-link">
            <Button variant="primary" className="w-100">
              جميع الاعلانات
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
          </DropdownButton>

          <Link to="/dashboard/category" className="w-100 button-link">
            <Button variant="primary" className="w-100">
              تصنيف المدونات
            </Button>
          </Link>

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

          {/* الفلاتر */}
          <DropdownButton
            id="dropdown-basic-button"
            align="end"
            title="الفلاتر"
            className="w-100 sideDropdown"
          >
            <Dropdown.Item href="/dashboard/filters">
            جميع الفلاتر
            </Dropdown.Item>
            <Dropdown.Item href="/dashboard/filters/governorates">
              فلاتر المحافظات
            </Dropdown.Item>
            <Dropdown.Item href="/dashboard/filters/add-gov-filter">
              اضافه فلتر محافظة
            </Dropdown.Item>
            <Dropdown.Item href="/dashboard/filters/projects">
              فلاتر مشروعات
            </Dropdown.Item>
            <Dropdown.Item href="/dashboard/filters/add-project-filter">
              اضافه فلتر مشروع
            </Dropdown.Item>
          </DropdownButton>

          <Button variant="danger" className="w-100" onClick={Logout}>
            تسجيل الخروج
          </Button>
        </div>
      </div>
      {/* </div> */}
      {/* <div className="bottom-content">
          <li className="redhover">
            <a href="/Login" >
              <span className="text nav-text">Logout</span>
            </a>
          </li>
        </div> */}
    </nav>
  );
}
