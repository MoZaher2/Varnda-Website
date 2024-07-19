import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './PropertiesTable.module.css'; // Import CSS module

const PropertiesTable = ({ data, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive="sm">
      <thead>
        <tr>
          <th className={styles.header}>ID</th>
          <th className={styles.header}>عنوان المقال	</th>
          <th className={styles.header}>التاريخ</th>
          <th className={styles.header}>الفئة</th>
          <th className={`${styles.header}  d-none d-sm-block`}>أجراءات</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.date}</td>
            <td>{item.category}</td>
            <td className='d-none d-sm-block px-5'>
              <Button variant="primary" onClick={() => onEdit(item.id)}>
                تعديل
              </Button>
              <Button className='float-start' variant="danger" onClick={() => onDelete(item.id)}>
                حذف
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PropertiesTable;
