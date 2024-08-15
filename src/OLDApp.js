import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import ArticlesInCategory from "./Pages//Articles/ArticlesInCategory";
// 
///////Admin
import AdminLayout from './Pages/AdminLayout'
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

const router = createBrowserRouter([
    ////Public Route
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/Blogs",
      element: <ArticlesLayout />,
      children: [
        {
          path: "",
          element: <Articles />,
        },
        {
          path: ":category",
          element: <ArticlesInCategory />,
        },
      ]
    },
    {
      path: "/Blog/:id",
      element: <ArticleDetailes />,
    },
    {
      path: "/searchPage/:gov",
      element: <SearchPage />,
    },
    {
      path: '/aboutUs',
      element: <AboutPage />,
    },
    {
      path: '/contactUs',
      element: <ContactPage />,
    },
    {
      path: "/terms",
      element: <TermsPage />,
    },
    {
      path: "/searchPage",
      element: <SearchPage />,
    },
    {
      path: "/moreDeteliesPage/:id",
      element: <MoreDeteliesPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/submit-property",
      element: <SubmitpropertyPage />,
    },
  // AdminRoute
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <h1>Dashboard</h1>,
      },
      {
        path: "all-ads",
        element: <AllAds />
      },
      {
        path: "Blogs",
        element: <AllArticles />,
      },
      {
        path: "Blogs-category",
        element: <ArticlesCategory />,
      },
      {
        path: "add-Blog",
        element: <AddArticle />,
      },
      {
        path: "category",
        element: <CategoryArticle />,
      },
      {
        path: "governments",
        element: <Governments />
      },
      {
        path: "cities",
        element: <Cities />
      },
      {
        path: "regions",
        element: <Regions />
      },
      {
        path: "streets",
        element: <Streets />
      },
      {
        path: "compounds",
        element: <Compounds />
      },
      {
        path: "molls",
        element: <Molls />
      },
    ],
  },
  
  ///User Route
  {
    path: "/fav",
    element: <FavPage />,
  },
  {
    path: "/add-apartments-duplexes",
    element: <AddApartmentsAndDuplexesPage />,
  },
  {
    path: "/add-villas-palaces",
    element: <AddVillasAndPalacesPage />,
  },
  {
    path: "/add-home-property",
    element: <AddHomePropertyPage />,
  },
  {
    path: "/add-resorts-coasts",
    element: <AddResortsAndCoastsPage />,
  },
  {
    path: "/add-commercial-units",
    element: <AddCommercialUnitsPage />,
  },
  {
    path: "/add-lands",
    element: <AddLandPage />,
  },
  {
    path: "/add-buildings",
    element: <AddBuildingsPage />,
  },
  {
    path: "/add-cemeteries",
    element: <AddNewCemeteries />,
  },
  {
    path: "/myprofile",
    element: <ProfilePage />,
  },
  {
    path: "/myproperties",
    element: <MyPropertiesPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;