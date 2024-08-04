import Footer from '../../Components/Footer/Footer'
import HeaderPageLink from '../../Components/HeaderPageLink/HeaderPageLink'
import { Outlet } from "react-router-dom";
import Header from '../Header/Header';

export default function ArticlesLayout() {
    return (
        <>
            <Header />
            <HeaderPageLink />
            <Outlet />
            <Footer />
        </>
    )
}
