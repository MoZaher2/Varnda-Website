import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import TermsPage from "./Pages/TermsPage/TermsPage";
import FindHomePage from "./Pages/FindHomePage/FindHomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import AdvicePage from "./Pages/AdvicePage/AdvicePage";
import MixPage from "./Pages/MixPage/MixPage";
import RegionsOfEgyptPage from "./Pages/RegionsOfEgyptPage/RegionsOfEgyptPage";
import EventsPage from "./Pages/EventsPage/EventsPage";
import DetailesPage from "./Pages/DetailesPage/DetailesPage";
import CompanyPage from "./Pages/CompanyPage/CompanyPage";
import AreaPage from "./Pages/AreaPage/AreaPage";
import CompanyDetailes from "./Pages/CompanyDetailes/CompanyDetailes";
import MoreDeteliesPage from "./Pages/MoreDeteliesPage/MoreDeteliesPage";
import FavPage from "./Pages/FavPage/FavPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import SubmitpropertyPage from "./Pages/SubmitpropertyPage/SubmitpropertyPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import AddApartmentsAndDuplexesPage from "./Pages/AddApartmentsAndDuplexesPage/AddApartmentsAndDuplexesPage";
import AddVillasAndPalacesPage from "./Pages/AddVillasAndPalacesPage/AddVillasAndPalacesPage";
import AddHomePropertyPage from "./Pages/AddHomePropertyPage/AddHomePropertyPage";
import AddResortsAndCoastsPage from "./Pages/AddResortsAndCoastsPage/AddResortsAndCoastsPage";
import AddCommercialUnitsPage from "./Pages/AddCommercialUnitsPage/AddCommercialUnitsPage";
import AddLandPage from "./Pages/AddLandPage/AddLandPage";
import AddBuildingsPage from "./Pages/AddBuildingsPage/AddBuildingsPage";
import AddNewCemeteries from "./Pages/AddNewCemeteries/AddNewCemeteries";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import MyPropertiesPage from "./Pages/MyPropertiesPage/MyPropertiesPage";
import ArticleDetailes from "./Pages/Articles/ArticleDetailes/ArticleDetailes";
import Articles from "./Pages/Articles/Articles";
import ArticlesLayout from "./Components/Articles/ArticlesLayout";
import ArticlesInCategory from "./Pages/Articles/ArticlesInCategory";
import AdminLayout from './Pages/AdminLayout';
import AddArticle from "./Pages/Dashboard/Articles/AddArticle";
import CategoryArticle from "./Pages/Dashboard/CategoryArticle";
import Governments from "./Pages/Dashboard/Places/Governments";
import Cities from "./Pages/Dashboard/Places/Cities";
import Regions from "./Pages/Dashboard/Places/Regions";
import Streets from "./Pages/Dashboard/Places/Streets";
import Compounds from "./Pages/Dashboard/Places/Compounds";
import AllArticles from "./Pages/Dashboard/Articles/AllArticles";
import ArticlesCategory from "./Pages/Dashboard/Articles/ArticlesCategory";
import Molls from "./Pages/Dashboard/Places/Molls";
import AllAds from "./Pages/Dashboard/AllAds";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesLayout />}>
          <Route index element={<Articles />} />
          <Route path=":category" element={<ArticlesInCategory />} />
        </Route>
        <Route path="/article/:id" element={<ArticleDetailes />} />
        <Route path="/searchPage/:gov" element={<SearchPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/contactUs" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/moreDeteliesPage/:id" element={<MoreDeteliesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/submit-property" element={<SubmitpropertyPage />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="all-ads" element={<AllAds />} />
          <Route path="articles" element={<AllArticles />} />
          <Route path="articles-category" element={<ArticlesCategory />} />
          <Route path="add-article" element={<AddArticle />} />
          <Route path="category" element={<CategoryArticle />} />
          <Route path="governments" element={<Governments />} />
          <Route path="cities" element={<Cities />} />
          <Route path="regions" element={<Regions />} />
          <Route path="streets" element={<Streets />} />
          <Route path="compounds" element={<Compounds />} />
          <Route path="molls" element={<Molls />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/fav"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <FavPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-apartments-duplexes"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddApartmentsAndDuplexesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-villas-palaces"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddVillasAndPalacesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-home-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddHomePropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-resorts-coasts"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddResortsAndCoastsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-commercial-units"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddCommercialUnitsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-lands"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddLandPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-buildings"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddBuildingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-cemeteries"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddNewCemeteries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myproperties"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <MyPropertiesPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
