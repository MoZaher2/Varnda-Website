import React from "react";
import "./HomePage.css";
import Header from "../../Components/Header/Header";
import SearchForm from "../../Components/SearchForm/SearchForm";
import Swapper from "../../Components/Swapper/Swapper";
import PropertySection from "../../Components/PropertySection/PropertySection";
import Footer from "../../Components/Footer/Footer";
import DescoverySection from "../../Components/DescoverySection/DescoverySection";
import bgimage from "../../images/1.jpg"


// *****************
import img15 from '../../images/15.jpeg';
import img16 from '../../images/16.webp';
import img17 from '../../images/17.jpeg';
import img18 from '../../images/18.jpeg';
import img19 from '../../images/19.jpeg';
import img20 from '../../images/20.jpeg';
import Company from "../../Components/Company/Company";

export default function HomePage() {




  const propertiesForSale = {
    'شقق في مدن أخرى': ['مدينتي', 'المقصد', 'بداية بالم هيلز', 'الروح', 'صن كابيتال'],
    'شقق الشيخ زايد': ['الحضار', 'بفرلي هيلز', 'بيت الوطن', 'فللج وست', 'أبراج زيد'],
    'شقق القاهرة الجديدة': ['تاج سيتي', 'ماونتن فيو آي سيتي', 'هايد بارك القاهرة الجديدة', 'فيفث سكوير', 'بالم هيلز القاهرة الجديدة'],
    'فيلات في مدن أخرى': ['مدينتي', 'المقصد', 'بداية بالم هيلز', 'الروح', 'صن كابيتال'],
    'فيلات الشيخ زايد': ['الروى', 'رويال سيتي', 'بالم هيلز جولف اكستنشن', 'رويال ميدوز', 'الكارما 4'],
    'فيلات القاهرة الجديدة': ['هايد بارك القاهرة الجديدة', 'ميڤيدا', 'ستون بارك', 'ليان', 'ازار']
  };

  const propertiesForRent = {
    'شقق في مدن أخرى': ['مدينة نصر', 'المعادي', 'الرحاب', '6 أكتوبر', 'العاشر من رمضان'],
    'شقق الشيخ زايد': ['الحصري', 'الحي التاسع', 'الحي العاشر', 'النادي الأهلي', 'الحي السابع'],
    'شقق القاهرة الجديدة': ['النرجس', 'القرنفل', 'الرحاب', 'مدينتي', 'شويفات'],
    'فيلات في مدن أخرى': ['مدينة نصر', 'المعادي', 'الرحاب', '6 أكتوبر', 'العاشر من رمضان'],
    'فيلات الشيخ زايد': ['الحصري', 'الحي التاسع', 'الحي العاشر', 'النادي الأهلي', 'الحي السابع'],
    'فيلات القاهرة الجديدة': ['النرجس', 'القرنفل', 'الرحاب', 'مدينتي', 'شويفات']
  };


  const images = [
    { id: 1, image: img15, text: 'مشروعات متطورة في الساحل الشمالي عام 2024', propertiesForSale: 429, propertiesForRent: 15, companyName: 'اسم الشركة 1' },
    { id: 2, image: img16, text: 'أفضل الكومبوندات في الساحل الشمالي لمصايف الصيفي', propertiesForSale: 320, propertiesForRent: 10, companyName: 'اسم الشركة 2' },
    { id: 3, image: img17, text: 'الاستثمار في العقارات: أفضل الأماكن في مصر', propertiesForSale: 540, propertiesForRent: 20, companyName: 'اسم الشركة 3' },
    { id: 4, image: img18, text: 'شقق مطلة على نهر النيل: اختيار الموقع المناسب', propertiesForSale: 210, propertiesForRent: 5, companyName: 'اسم الشركة 4' },
    { id: 5, image: img19, text: 'مشروعات متطورة في الساحل الشمالي عام 2024', propertiesForSale: 429, propertiesForRent: 15, companyName: 'اسم الشركة 5' },
    { id: 6, image: img20, text: 'شقق مطلة على نهر النيل: اختيار الموقع المناسب', propertiesForSale: 210, propertiesForRent: 5, companyName: 'اسم الشركة 6' },
  ];
  return (
    <>
      <Header />
      <SearchForm backgroundImage={bgimage} />

  
  <Swapper/>
  <PropertySection 
        propertiesForSale={propertiesForSale} 
        propertiesForRent={propertiesForRent} 
        heading="مصر"
      />
      <Company />
      <Footer />
    </>
  );
}
