import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './PropertiesTable.module.css'; // Import CSS module
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
const PropertiesTable = ({ data, onEdit, onDelete }) => {
  
  return (
    <Table striped bordered hover responsive="lg">
      <thead>
        <tr>
          <th className={styles.header}>#</th>
          <th className={styles.header}>اسم العقار</th>
          <th className={styles.header}>الفئة</th>
          <th className={styles.header}>نوع العقار</th>
          <th className={styles.header}>رابط العقار</th>
          <th className={styles.header}>تاريخ الرفع</th>
          <th className={styles.header}>أجراءات</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className='text-center'>
            <td className='text-end'>{item.id}</td>
            <td>{item.property["Arabic Name"]}</td>
            <td>{item.property.Category}</td>
            <td>{item.property["Sub Category"]}</td>
            <td>
              <Link to={`/moreDeteliesPage/${item.id}`}>
                الذهاب للاعلان
              </Link>
            </td>
            <td>
              {format(new Date(item.property.created_at), 'dd-MM-yyyy HH:mm:ss')}
            </td>
            <td>
              <Button variant="danger" onClick={() => onDelete(item.id)}>
                حذف
              </Button>
            </td>
            {/* <td className='d-none d-sm-block px-5'>
              <Button variant="primary" onClick={() => onEdit(item.id)}>
                تعديل
              </Button>
              <Button className='float-start' variant="danger" onClick={() => onDelete(item.id)}>
                حذف
              </Button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PropertiesTable;
