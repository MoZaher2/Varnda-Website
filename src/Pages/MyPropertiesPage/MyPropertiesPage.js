import React, { useState } from 'react';
import PropertiesTable from '../../Components/PropertiesTable/PropertiesTable';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './MyPropertiesPage.module.css'; // Import CSS module

const MyPropertiesPage = () => {
  const [data, setData] = useState([
    { id: 10791, title: 'شقة 78متر + حديقة خاصة في bella bay beach الممشي السياحي الغردقة للبيع', date: '2024-07-10 19:45:07', category: 'فلل وقصور' },
    { id: 10790, title: 'شقه فيو بحر بالممشى السياحي بمقدم يبدا من 10% وتسهيلات تصل لـ4 سنوات', date: '2024-07-10 19:41:46', category: 'شقق و دوبلكس' },
  ]);

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log('Edit item with id:', id);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    setData(data.filter(item => item.id !== id));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>عقاراتي</h1>
        <PropertiesTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Footer />
    </>
  );
};

export default MyPropertiesPage;
