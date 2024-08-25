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
import AdminLayout from "./Pages/AdminLayout";
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
import AuthGoogle from "./Pages/AuthGoogle/AuthGoogle";
import AddQuickPage from "./Pages/AddQuickPage/AddQuickPage";
import LoginWithRole from "./Components/LoginWithRole/LoginWithRole";
import AddUsers from "./Pages/Dashboard/Users/AddUsers";
import ShowAllUsers from "./Pages/Dashboard/Users/ShowAllUsers";
import EditArticle from "./Pages/Dashboard/Articles/EditArticle";
import AllDrafts from "./Pages/Dashboard/Articles/AllDrafts";
import ArticlesWithTag from "./Pages/Articles/ArticlesWithTag";
import EditQuickPage from "./Pages/EditAdsPages/EditQuickPage/EditQuickPage";
import EditApartmentsAndDuplexesPage from "./Pages/EditAdsPages/EditApartmentsAndDuplexesPage/EditApartmentsAndDuplexesPage";
import EditVillasAndPalacesPage from "./Pages/EditAdsPages/EditVillasAndPalacesPage/EditVillasAndPalacesPage";
import EditHomePropertyPage from "./Pages/EditAdsPages/EditHomePropertyPage/EditHomePropertyPage";
import EditResortsAndCoastsPage from "./Pages/EditAdsPages/EditResortsAndCoastsPage/EditResortsAndCoastsPage";
import EditCommercialUnitsPage from "./Pages/EditAdsPages/EditCommercialUnitsPage/EditCommercialUnitsPage";
import EditLandPage from "./Pages/EditAdsPages/EditLandPage/EditLandPage";
import EditBuildingsPage from "./Pages/EditAdsPages/EditBuildingsPage/EditBuildingsPage";
import EditNewCemeteries from "./Pages/EditAdsPages/EditNewCemeteries/EditNewCemeteries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        {/*  */}
        <Route path="/admin-login" element={<LoginWithRole role="admin" />} />
        <Route path="/seo-login" element={<LoginWithRole role="seo" />} />
        <Route path="/writer-login" element={<LoginWithRole role="writer" />} />
        {/*  */}

        <Route path="/Blogs" element={<Articles />} />
        <Route path="/Blogs/:category/ne" element={<ArticlesInCategory />} />
        <Route path="/Blogs/tags/:tag" element={<ArticlesWithTag />} />


        <Route path="/Blog/:id" element={<ArticleDetailes />} />
        <Route path="/search/:gov" element={<SearchPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/contactUs" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/property/:id" element={<MoreDeteliesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/google-auth" element={<AuthGoogle />} />
        <Route path="/submit-property" element={<SubmitpropertyPage />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "writer", "seo"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="all-ads" element={<AllAds />} />
          
          
          <Route path="Blogs" element={<AllArticles />} />
          <Route path="Drafts" element={<AllDrafts />} />
          

          <Route path="Blogs-category" element={<ArticlesCategory />} />
          <Route path="add-Blog" element={<AddArticle />} />
          <Route path="edit-Blog" element={<EditArticle />} />


          <Route path="category" element={<CategoryArticle />} />
          <Route path="governments" element={<Governments />} />
          <Route path="cities" element={<Cities />} />
          <Route path="regions" element={<Regions />} />
          <Route path="streets" element={<Streets />} />
          <Route path="compounds" element={<Compounds />} />
          <Route path="molls" element={<Molls />} />
          <Route path="add-users" element={<AddUsers />} />
          <Route path="admin" element={<ShowAllUsers role="admin" />} />
          <Route path="writer" element={<ShowAllUsers role="writer" />} />
          <Route path="seo" element={<ShowAllUsers role="seo" />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/favorite-properties"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <FavPage />
            </ProtectedRoute>
          }
        />
         {/* Add ads route */}
        <Route
          path="/add-quick-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddQuickPage />
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

        {/* Edite ads route */}
        <Route
          path="/edit-quick-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditQuickPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-apartments-duplexes"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditApartmentsAndDuplexesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-villas-palaces"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditVillasAndPalacesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-home-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditHomePropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-resorts-coasts"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditResortsAndCoastsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-commercial-units"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditCommercialUnitsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-lands"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditLandPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-buildings"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditBuildingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-cemeteries"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditNewCemeteries />
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
