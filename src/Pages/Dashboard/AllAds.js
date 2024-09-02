import { useEffect, useState } from "react";
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Alert } from "react-bootstrap";
import api from "../../API/ApiLink";
import { format } from 'date-fns';
import OverPage from './../../Components/OverPage/OverPage';
import DeleteItem from "../../Components/DeleteItem/DeleteItem";
export default function AllAds() {
    const token = Cookies.get("token");
    const [data, setData] = useState([])
    const [overlay, setOverlay] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [loadId, setLoadId] = useState(false);

    // استرجاع كل الاعلانات
    const handelAllAds = async () => {
        try {
            setOverlay(true)
            const response = await api.get(`/getAllAds`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setData(response.data.data)
            console.log(response.data.data);
        } catch (err) {
            console.log(err);
        }finally{
            setOverlay(false)
        }
    };
    useEffect(() => {
        handelAllAds();
    }, []);

    // حذف الاعلان
    const handleDelete = async (id) => {
        setSelectedItemId(id);
        setLoadId(true);
        try {
            const response = await api.post(`/deleteAd/${id}`, {},{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            handelAllAds()
        } catch (err) {
            console.log(err);
        } finally {
            setSelectedItemId(null);
            setLoadId(false);
          }
    }
    return (
      <>
        {overlay ? (
          <OverPage />
        ) : (
          <>
            {data.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>اسم العقار</th>
                    <th>الفئه</th>
                    <th>نوع العقار</th>
                    <th>رابط العقار</th>
                    <th>تاريخ الرفع</th>
                    <th>أجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td>{item.id}</td>
                      <td>{item.property["Arabic Name"]}</td>
                      <td>{item.property.Category}</td>
                      <td>{item.property["Sub Category"]}</td>
                      <td>
                        <Link to={`/property/${item.slug}`}>
                          الذهاب للاعلان
                        </Link>
                      </td>
                      <td>
                        {format(
                          new Date(item.property.created_at),
                          "dd-MM-yyyy HH:mm:ss"
                        )}
                      </td>
                      {/* <td>
                                 <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                     حذف
                                 </Button>
                             </td> */}
                      <DeleteItem
                        id={selectedItemId}
                        setId={setSelectedItemId}
                        itemId={item.id}
                        DeleteFun={handleDelete}
                        load={loadId}
                      />
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert key="warning" className="text-center" variant="warning">
                لا يوجد اعلانات
              </Alert>
            )}
          </>
        )}
      </>
    );
}