import { useEffect, useState } from "react";
import { Col, ListGroup, Button, Fade } from "react-bootstrap";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../API/ApiLink";

export default function ShowFilterToUser({type="",gov="",compound=""}) {

  const [numOfGov, setNumOfGov] = useState(5);
  const [numOfMall, setNumOfMall] = useState(5);
  const [numOfRandom, setNumOfRandom] = useState(5);
  const [filters, setFilters] = useState(null);

  // Fetch filters
  const fetchFilters = async () => {
    try {
      console.log("Data send in filter: ",type,gov,compound)
      const formDataToSend = new FormData();
      formDataToSend.append("type", type);
      formDataToSend.append("gov", gov);
      formDataToSend.append("compound", compound);
      const response = await api.post(`/getFilters`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data);
      setFilters(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, [type,gov,compound]);

  return (
    <>
      {filters && (
        <>
          {/* فلاتر محافظات */}
          <>
              {filters.gov.length > 0 && (
                <>
                <h4 className="my-3 h4">نتائج مقترحة (محافظات)</h4>
                  <ListGroup variant="flush">
                    {filters.gov.slice(0, numOfGov).map((filter, index) => (
                      <Link
                        to={`/search/filter/${filter.url}`}
                        className="link-item"
                        key={index}
                      >
                        <ListGroup.Item className="item">
                          {filter.filter_name}
                        </ListGroup.Item>
                      </Link>
                    ))}
                  </ListGroup>
                  {numOfGov === 5 ? (
                    <p
                      onClick={() => {
                        setNumOfGov(filters.gov.length);
                      }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#0d6efc",
                        cursor: "pointer",
                      }}
                    >
                      عرض المزيد
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setNumOfGov(5);
                      }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#0d6efc",
                        cursor: "pointer",
                      }}
                    >
                      عرض اقل
                    </p>
                  )}
                </>
              )}
          </>

          {/* فلاتر مشروعات */}
          <>
              {filters.mall.length > 0 && (
                <>
                <h4 className="my-3 h4">نتائج مقترحة (مشروعات عقارية)</h4>
                  <ListGroup variant="flush">
                    {filters.mall.slice(0, numOfMall).map((filter, index) => (
                      <Link
                        to={`/search/filter/${filter.url}`}
                        className="link-item"
                        key={index}
                      >
                        <ListGroup.Item className="item">
                          {filter.filter_name}
                        </ListGroup.Item>
                      </Link>
                    ))}
                  </ListGroup>
                  {numOfMall === 5 ? (
                    <p
                      onClick={() => {
                        setNumOfMall(filters.mall.length);
                      }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#0d6efc",
                        cursor: "pointer",
                      }}
                    >
                      عرض المزيد
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setNumOfMall(5);
                      }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#0d6efc",
                        cursor: "pointer",
                      }}
                    >
                      عرض اقل
                    </p>
                  )}
                </>
              )}
          </>

          {/* مقترحات */}
          <>
              {filters.random.length > 0 && (
                <>
                <h4 className="my-3 h4">روابط قد تعجبك</h4>
                  <ListGroup variant="flush">
                    {filters.random.slice(0, numOfRandom).map((filter, index) => (
                      <Link
                        to={`/search/filter/${filter.url}`}
                        className="link-item"
                        key={index}
                      >
                        <ListGroup.Item className="item">
                          {filter.filter_name}
                        </ListGroup.Item>
                      </Link>
                    ))}
                  </ListGroup>
                  {numOfRandom === 5 ? (
                    <p
                      onClick={() => {
                        setNumOfRandom(filters.random.length);
                      }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#0d6efc",
                        cursor: "pointer",
                      }}
                    >
                      عرض المزيد
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setNumOfRandom(5);
                      }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#0d6efc",
                        cursor: "pointer",
                      }}
                    >
                      عرض اقل
                    </p>
                  )}
                </>
              )}
          </>
        </>
      )}
    </>
  );
}
