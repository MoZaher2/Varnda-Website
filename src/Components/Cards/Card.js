import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Card.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBed,
    faBath,
    faEnvelope,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSearchAdvanced from "../HeaderSearchAdvanced/HeaderSearchAdvanced";
import imgCard from "../../images/image_card.png";
import card1 from "../../images/card_1.png";
import card2 from "../../images/card_2.png";
import card3 from "../../images/card_3.png";
import card4 from "../../images/card_4.png";
import card5 from "../../images/card_5.png";
import card6 from "../../images/card_6.png";
import card7 from "../../images/card_13.png";
import card8 from "../../images/card_8.png";
import card9 from "../../images/card_9.png";
import card10 from "../../images/card_10.png";
import card11 from "../../images/card_11.png";
import card12 from "../../images/card_12.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Phone from "./Phone";



export default function PropertyCard() {
    const properties = [
        {
            property_id: 10,
            phone:"01005138370",
            whats_phone:"01005138370",
            price: "23,503,500 ج.م",
            type: "هاوس",
            beds: 4,
            baths: 4,
            area: "216 متر مربع",
            description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            rooms: "4 غرف 03500...",
            location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            images: [card1, card2, card3],
        },
        {
            price: "23,503,500 ج.م",
            type: "هاوس",
            beds: 4,
            baths: 4,
            area: "216 متر مربع",
            description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            rooms: "4 غرف 03500...",
            location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            images: [card4, card5, card6],
        },
        {
            price: "23,503,500 ج.م",
            type: "هاوس",
            beds: 4,
            baths: 4,
            area: "216 متر مربع",
            description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            rooms: "4 غرف 03500...",
            location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            images: [card7, card8, card9],
        },
        {
            price: "23,503,500 ج.م",
            type: "هاوس",
            beds: 4,
            baths: 4,
            area: "216 متر مربع",
            description: "تاون هاوس في هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            rooms: "4 غرف 03500...",
            location: "هايد بارك القاهرة الجديدة، القاهرة الجديدة",
            images: [card10, card11, card12],
        },
    ];

    const data = [
        {
            "phone":"201005138370",
            "whats_phone":"01005138370",
            "id": 1,
            "property_id": 1,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 1,
                "primary_picture": "https://example.com/primary_picture.jpg",
                "Arabic Name": "فيلا فاخرة",
                "English Name": null,
                "Type": "sale",
                "Category": "Residential",
                "Sub Category": "Villa",
                "User_id": null,
                "Company_id": null,
                "governorate": "Cairo",
                "city": "Giza",
                "region": "6th October",
                "street": "El Haram Street",
                "full_address": "123 El Haram Street, Giza, Egypt",
                "details_ar": "فيلا فاخرة مع حديقة وحمام سباحة",
                "details_en": null,
                "video_link": "https://example.com/video-link",
                "phone": null,
                "view": "Garden View",
                "price": "1500000.00",
                "area": 350,
                "payment_method": "Cash",
                "rooms": 5,
                "bathrooms": 3,
                "finishing_type": "Luxury",
                "floors": 2,
                "Furnished": 1,
                "compound_name": "Green Valley Compound",
                "latitude": "30.04442000",
                "longitude": "31.23571200",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": null,
                "Discount": 10,
                "floor_number": 1,
                "deliver_date": "2022-01-01",
                "legal_papers": "Title Deed",
                "department": "commercial",
                "facilities": {
                    "Gym": true,
                    "Parking": true,
                    "Swimming Pool": true
                },
                "features": {
                    "Central Heating": true,
                    "Air Conditioning": true
                },
                "services": {
                    "Security": true,
                    "Cleaning Service": true
                },
                "devices": {
                    "Microwave": true,
                    "Washing Machine": true
                },
                "accessories": {
                    "Balcony": true,
                    "Storage Room": true
                },
                "price_per": "month"
            }
        },
        {
            "id": 2,
            "property_id": 2,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 2,
                "primary_picture": "https://example.com/primary_picture2.jpg",
                "Arabic Name": "شقة حديثة",
                "English Name": null,
                "Type": "rent",
                "Category": "Residential",
                "Sub Category": "Apartment",
                "User_id": null,
                "Company_id": null,
                "governorate": "Alexandria",
                "city": "Alexandria",
                "region": "Smouha",
                "street": "El Horreya Road",
                "full_address": "456 El Horreya Road, Alexandria, Egypt",
                "details_ar": "شقة حديثة ومؤثثة بالكامل",
                "details_en": null,
                "video_link": "https://example.com/video-link2",
                "phone": null,
                "view": "Sea View",
                "price": "12000.00",
                "area": 150,
                "payment_method": "Credit",
                "rooms": 3,
                "bathrooms": 2,
                "finishing_type": "Modern",
                "floors": 10,
                "Furnished": 1,
                "compound_name": "Blue Bay Compound",
                "latitude": "31.20009200",
                "longitude": "29.91873900",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": "12",
                "Discount": 5,
                "floor_number": 5,
                "deliver_date": "2023-05-01",
                "legal_papers": "Lease Contract",
                "department": "administrative",
                "facilities": {
                    "Parking": true,
                    "Elevator": true
                },
                "features": {
                    "Insulation": true,
                    "Double Glazed Windows": true
                },
                "services": {
                    "Concierge": true,
                    "Maintenance": true
                },
                "devices": {
                    "Dishwasher": true,
                    "Refrigerator": true
                },
                "accessories": {
                    "Terrace": true,
                    "Fireplace": true
                },
                "price_per": "year"
            }
        },
        {
            "id": 3,
            "property_id": 3,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 3,
                "primary_picture": "https://example.com/primary_picture3.jpg",
                "Arabic Name": "محل تجاري",
                "English Name": null,
                "Type": "rent",
                "Category": "Commercial",
                "Sub Category": "Shop",
                "User_id": null,
                "Company_id": null,
                "governorate": "Cairo",
                "city": "Nasr City",
                "region": "7th District",
                "street": "Tayaran Street",
                "full_address": "789 Tayaran Street, Nasr City, Egypt",
                "details_ar": "محل تجاري في موقع مميز",
                "details_en": null,
                "video_link": null,
                "phone": null,
                "view": "Street View",
                "price": "5000.00",
                "area": 100,
                "payment_method": "Cash",
                "rooms": 0,
                "bathrooms": 1,
                "finishing_type": "Basic",
                "floors": 1,
                "Furnished": 0,
                "compound_name": "Al Masrawya Mall",
                "latitude": "30.05961800",
                "longitude": "31.33769600",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": "1",
                "Discount": null,
                "floor_number": null,
                "deliver_date": null,
                "legal_papers": null,
                "department": "commercial",
                "facilities": {
                    "Parking": true
                },
                "features": {
                    "Security System": true
                },
                "services": {
                    "Internet": true
                },
                "devices": {
                    "Air Conditioning": true
                },
                "accessories": {
                    "Display Windows": true
                },
                "price_per": "day"
            }
        },
        {
            "id": 4,
            "property_id": 4,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 4,
                "primary_picture": "https://example.com/primary_picture1.jpg",
                "Arabic Name": "شقة للبيع",
                "English Name": null,
                "Type": "sale",
                "Category": "سكني",
                "Sub Category": "شقة",
                "User_id": null,
                "Company_id": null,
                "governorate": "القاهرة",
                "city": "مدينة نصر",
                "region": "الحي السابع",
                "street": "شارع الطيران",
                "full_address": "123 شارع الطيران، مدينة نصر، القاهرة، مصر",
                "details_ar": "شقة واسعة مع إطلالة رائعة على الشارع",
                "details_en": null,
                "video_link": "https://example.com/video-link1",
                "phone": null,
                "view": "إطلالة على الشارع",
                "price": "1500000.00",
                "area": 200,
                "payment_method": "نقدا",
                "rooms": 3,
                "bathrooms": 2,
                "finishing_type": "فاخر",
                "floors": 5,
                "Furnished": 1,
                "compound_name": "كمبوند سيتي ستارز",
                "latitude": "30.04852600",
                "longitude": "31.33467600",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": null,
                "Discount": 10,
                "floor_number": 7,
                "deliver_date": "2022-01-01",
                "legal_papers": "عقد ملكية",
                "department": null,
                "facilities": {
                    "مسبح": true,
                    "نادي رياضي": true,
                    "موقف سيارات": true
                },
                "features": {
                    "تكييف مركزي": true,
                    "نوافذ زجاج مزدوج": true
                },
                "services": {
                    "بواب": true,
                    "خدمة تنظيف": true
                },
                "devices": {
                    "ثلاجة": true,
                    "غسالة": true
                },
                "accessories": {
                    "تراس": true,
                    "شرفة": true
                },
                "price_per": "month"
            }
        },
        {
            "id": 5,
            "property_id": 5,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 5,
                "primary_picture": "https://example.com/primary_picture2.jpg",
                "Arabic Name": "فيلا للإيجار",
                "English Name": null,
                "Type": "rent",
                "Category": "سكني",
                "Sub Category": "فيلا",
                "User_id": null,
                "Company_id": null,
                "governorate": "الإسكندرية",
                "city": "سموحة",
                "region": "جرين بلازا",
                "street": "شارع محطة مصر",
                "full_address": "456 شارع محطة مصر، سموحة، الإسكندرية، مصر",
                "details_ar": "فيلا فاخرة مع حديقة خاصة",
                "details_en": null,
                "video_link": "https://example.com/video-link2",
                "phone": null,
                "view": "إطلالة على الحديقة",
                "price": "30000.00",
                "area": 500,
                "payment_method": "نقدا أو تقسيط",
                "rooms": 5,
                "bathrooms": 4,
                "finishing_type": "فخم",
                "floors": 2,
                "Furnished": 1,
                "compound_name": "كمبوند جرين بلازا",
                "latitude": "31.20009200",
                "longitude": "29.91873900",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": "12",
                "Discount": 5,
                "floor_number": 1,
                "deliver_date": "2023-05-01",
                "legal_papers": "عقد إيجار",
                "department": null,
                "facilities": {
                    "نادي صحي": true,
                    "موقف سيارات": true
                },
                "features": {
                    "عزل حراري": true,
                    "تدفئة مركزية": true
                },
                "services": {
                    "صيانة": true,
                    "خدمة بواب": true
                },
                "devices": {
                    "ميكروويف": true,
                    "مكيف هواء": true
                },
                "accessories": {
                    "شرفة": true,
                    "غرفة تخزين": true
                },
                "price_per": "month"
            }
        },
        {
            "id": 6,
            "property_id": 6,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 6,
                "primary_picture": "https://example.com/primary_picture3.jpg",
                "Arabic Name": "محل تجاري للبيع",
                "English Name": null,
                "Type": "sale",
                "Category": "تجاري",
                "Sub Category": "محل",
                "User_id": null,
                "Company_id": null,
                "governorate": "القاهرة",
                "city": "وسط البلد",
                "region": "طلعت حرب",
                "street": "شارع قصر النيل",
                "full_address": "789 شارع قصر النيل، وسط البلد، القاهرة، مصر",
                "details_ar": "محل تجاري في موقع مميز بوسط البلد",
                "details_en": null,
                "video_link": "https://example.com/video-link3",
                "phone": null,
                "view": "إطلالة على الشارع",
                "price": "5000000.00",
                "area": 150,
                "payment_method": "نقدا",
                "rooms": 0,
                "bathrooms": 1,
                "finishing_type": "فاخر",
                "floors": 1,
                "Furnished": 0,
                "compound_name": "مجمع التحرير",
                "latitude": "30.04708600",
                "longitude": "31.23362500",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": null,
                "Discount": 0,
                "floor_number": null,
                "deliver_date": "2021-07-01",
                "legal_papers": "عقد ملكية",
                "department": "commercial",
                "facilities": {
                    "موقف سيارات": true
                },
                "features": {
                    "نظام أمني": true
                },
                "services": {
                    "إنترنت": true
                },
                "devices": {
                    "تكييف": true
                },
                "accessories": {
                    "نوافذ عرض": true
                },
                "price_per": "month"
            }
        },
        {
            "id": 7,
            "property_id": 7,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 7,
                "primary_picture": "https://example.com/primary_picture4.jpg",
                "Arabic Name": "شقة مفروشة للإيجار",
                "English Name": null,
                "Type": "rent",
                "Category": "سكني",
                "Sub Category": "شقة",
                "User_id": null,
                "Company_id": null,
                "governorate": "القاهرة",
                "city": "المعادي",
                "region": "المعادي الجديدة",
                "street": "شارع 9",
                "full_address": "234 شارع 9، المعادي الجديدة، القاهرة، مصر",
                "details_ar": "شقة مفروشة بالكامل للإيجار",
                "details_en": null,
                "video_link": "https://example.com/video-link4",
                "phone": null,
                "view": "إطلالة على الشارع",
                "price": "8000.00",
                "area": 120,
                "payment_method": "نقدا",
                "rooms": 2,
                "bathrooms": 1,
                "finishing_type": "متوسط",
                "floors": 10,
                "Furnished": 1,
                "compound_name": "كمبوند المعادي",
                "latitude": "29.95232600",
                "longitude": "31.25669800",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": "3",
                "Discount": 0,
                "floor_number": 5,
                "deliver_date": "2022-02-01",
                "legal_papers": "عقد إيجار",
                "department": null,
                "facilities": {
                    "مصعد": true,
                    "موقف سيارات": true
                },
                "features": {
                    "عزل صوت": true,
                    "تدفئة مركزية": true
                },
                "services": {
                    "إنترنت": true,
                    "خدمة بواب": true
                },
                "devices": {
                    "غسالة": true,
                    "تلفزيون": true
                },
                "accessories": {
                    "شرفة": true,
                    "ستائر": true
                },
                "price_per": "month"
            }
        },
        {
            "id": 8,
            "property_id": 8,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 8,
                "primary_picture": "https://example.com/primary_picture5.jpg",
                "Arabic Name": "مكتب إداري للإيجار",
                "English Name": null,
                "Type": "rent",
                "Category": "تجاري",
                "Sub Category": "مكتب",
                "User_id": null,
                "Company_id": null,
                "governorate": "القاهرة",
                "city": "مصر الجديدة",
                "region": "الميرغني",
                "street": "شارع الميرغني",
                "full_address": "567 شارع الميرغني، مصر الجديدة، القاهرة، مصر",
                "details_ar": "مكتب إداري في موقع مميز",
                "details_en": null,
                "video_link": "https://example.com/video-link5",
                "phone": null,
                "view": "إطلالة على المدينة",
                "price": "15000.00",
                "area": 100,
                "payment_method": "نقدا",
                "rooms": 3,
                "bathrooms": 1,
                "finishing_type": "ممتاز",
                "floors": 1,
                "Furnished": 0,
                "compound_name": "كمبوند الميرغني",
                "latitude": "30.08609800",
                "longitude": "31.33929700",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": "6",
                "Discount": 0,
                "floor_number": 2,
                "deliver_date": "2022-03-01",
                "legal_papers": "عقد إيجار",
                "department": "administrative",
                "facilities": {
                    "مصعد": true,
                    "موقف سيارات": true
                },
                "features": {
                    "نظام أمني": true,
                    "أرضيات سيراميك": true
                },
                "services": {
                    "إنترنت": true,
                    "خدمة تنظيف": true
                },
                "devices": {
                    "مكيف هواء": true
                },
                "accessories": {
                    "نوافذ زجاج مزدوج": true
                },
                "price_per": "month"
            }
        },
        {
            "id": 9,
            "property_id": 9,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 9,
                "primary_picture": "https://example.com/primary_picture6.jpg",
                "Arabic Name": "استوديو للإيجار",
                "English Name": null,
                "Type": "rent",
                "Category": "سكني",
                "Sub Category": "استوديو",
                "User_id": null,
                "Company_id": null,
                "governorate": "الجيزة",
                "city": "المهندسين",
                "region": "شارع جامعة الدول",
                "street": "شارع جامعة الدول العربية",
                "full_address": "789 شارع جامعة الدول العربية، المهندسين، الجيزة، مصر",
                "details_ar": "استوديو مفروش بالكامل للإيجار",
                "details_en": null,
                "video_link": "https://example.com/video-link6",
                "phone": null,
                "view": "إطلالة على الشارع",
                "price": "5000.00",
                "area": 50,
                "payment_method": "نقدا",
                "rooms": 1,
                "bathrooms": 1,
                "finishing_type": "متوسط",
                "floors": 10,
                "Furnished": 1,
                "compound_name": "كمبوند المهندسين",
                "latitude": "30.07037400",
                "longitude": "31.20484400",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": "1",
                "Discount": 0,
                "floor_number": 5,
                "deliver_date": "2022-04-01",
                "legal_papers": "عقد إيجار",
                "department": null,
                "facilities": {
                    "مصعد": true,
                    "موقف سيارات": true
                },
                "features": {
                    "عزل صوت": true,
                    "تدفئة مركزية": true
                },
                "services": {
                    "إنترنت": true,
                    "خدمة بواب": true
                },
                "devices": {
                    "غسالة": true,
                    "تلفزيون": true
                },
                "accessories": {
                    "شرفة": true,
                    "ستائر": true
                },
                "price_per": "month"
            }
        },
        {
            "id": 10,
            "property_id": 10,
            "status": "available",
            "plan": "basic",
            "description": null,
            "points": 0,
            "created_at": null,
            "property": {
                "property_id": 10,
                "primary_picture": "https://example.com/primary_picture7.jpg",
                "Arabic Name": "شقة دوبلكس للبيع",
                "English Name": null,
                "Type": "sale",
                "Category": "سكني",
                "Sub Category": "دوبلكس",
                "User_id": null,
                "Company_id": null,
                "governorate": "القاهرة",
                "city": "التجمع الخامس",
                "region": "الحي الخامس",
                "street": "شارع التسعين",
                "full_address": "123 شارع التسعين، التجمع الخامس، القاهرة، مصر",
                "details_ar": "شقة دوبلكس بمساحة واسعة وتشطيبات فاخرة",
                "details_en": null,
                "video_link": "https://example.com/video-link7",
                "phone": null,
                "view": "إطلالة على الحديقة",
                "price": "3500000.00",
                "area": 300,
                "payment_method": "نقدا أو تقسيط",
                "rooms": 4,
                "bathrooms": 3,
                "finishing_type": "فخم",
                "floors": 2,
                "Furnished": 1,
                "compound_name": "كمبوند الباتيو",
                "latitude": "30.01505600",
                "longitude": "31.43035300",
                "created_at": "2024-07-28T14:49:03.000000Z",
                "renting_type": null,
                "Discount": 0,
                "floor_number": 1,
                "deliver_date": "2023-01-01",
                "legal_papers": "عقد ملكية",
                "department": null,
                "facilities": {
                    "حمام سباحة": true,
                    "نادي رياضي": true,
                    "موقف سيارات": true
                },
                "features": {
                    "تكييف مركزي": true,
                    "نوافذ زجاج مزدوج": true
                },
                "services": {
                    "خدمة بواب": true,
                    "خدمة تنظيف": true
                },
                "devices": {
                    "ثلاجة": true,
                    "غسالة": true
                },
                "accessories": {
                    "تراس": true,
                    "شرفة": true
                },
                "price_per": "month"
            }
        }
    ]

    const settings = {
        // dots: false,
        // infinite: true,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // حركة تلقائية
        autoplaySpeed: 3500, // الوقت بين كل حركة تلقائية (بالملي ثانية)
        // arrows: true, // تفعيل الأسهم الجانبية
    };
    //WhatsApp 
    const phoneNumber = "201118936185"; // استبدل هذا بالرقم الذي تريد مراسلته
    const message = "مرحباً، أنا مهتم بعقارك الموجود على فارندا"; // الرسالة التي تريد إرسالها
    const url = `https://api.whatsapp.com/send?phone="201118936185"&text=${encodeURIComponent("مرحباً، أنا مهتم بعقارك الموجود على فارندا")}`;
    //Email
    // const emailAddress = "www.mohamedzaher19@gmail.com"; // استبدل هذا بعنوان البريد الإلكتروني الذي تريد إرسال الرسالة إليه
    // const subject = "About Varnda"; // موضوع البريد الإلكتروني
    // const body = encodeURIComponent(message); // محتوى البريد الإلكتروني

    // const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // // فتح عميل البريد الإلكتروني مع النص
    // window.open(mailtoLink, '_blank');

    return (
        <>
            {/* ال Card */}
            {properties.map((property, index) => (

                            <Link to={`/moreDeteliesPage/${property.property_id}`} className="link" key={index}>
                <Card className="d-flex flex-row mb-3 small">

                    <div className="imgCont" style={{ width: "50%", height: "auto" }}>
                        <Slider {...settings}>
                            {property.images.map((image, idx) => (
                                <div>
                                        <img
                                            src={image}
                                            alt={`imgCard-${idx}`}
                                            key={idx}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                </div>
                            ))}
                        </Slider>
                        <h6 style={{ color: "#0d6efd" }} className="my-3">
                            الصور المتاحة لهذا العقار
                        </h6>
                        <div>

                            <Phone phone={property.phone} />
                            <Button variant="secondary" className="m-2 btn-sm">
                                <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                            </Button>
                            <a href={`https://api.whatsapp.com/send?phone=2${property.whats_phone}&text=${encodeURIComponent("مرحباً، أنا مهتم بعقارك الموجود على فارندا")}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="success" className="m-2 btn-sm">
                                    <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                                </Button>
                            </a>
                        </div>
                    </div>
                    <Card.Body style={{ textAlign: "right" }}>
                        <Card.Title
                            style={{
                                color: "#123",
                                fontWeight: "700",
                                fontSize: "28px",
                            }}
                            >
                            {property.price}
                        </Card.Title>
                        <Card.Text>
                            <Row className="mb-2">
                                <Col style={{ color: "#0d6efd" }}>
                                    <FontAwesomeIcon icon={faHome} /> {property.type}
                                </Col>
                                <Col style={{ color: "#0d6efd" }}>
                                    <FontAwesomeIcon icon={faBed} /> {property.beds}
                                </Col>
                                <Col style={{ color: "#0d6efd" }}>
                                    <FontAwesomeIcon icon={faBath} /> {property.baths}
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ color: "#868686" }}>
                                    المساحة: {property.area}
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ color: "#0d6efd" }} className="my-2">
                                    {property.description}
                                </Col>
                            </Row>
                            <Row>
                                <Col>{property.rooms}</Col>
                            </Row>
                            <Row>
                                <Col>{property.location}</Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            ))}
        </>
    );
}
