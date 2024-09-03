import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./ArticleDetailes.css";
import HeaderPageLink from "../../../Components/HeaderPageLink/HeaderPageLink.js";
import Footer from "../../../Components/Footer/Footer";
import api from "../../../API/ApiLink.js";
import usePageSEO from "../../../hooks/usePageSEO";
import AddComment from "../../../Components/Comments/AddComment.js";
import CommentCard from "../../../Components/Comments/CommentCard.js";
import Header from "../../../Components/Header/Header.js";
import Share from "../../../Components/Cards/Share";
import OverPage from "../../../Components/OverPage/OverPage.js";

export default function ArticleDetailes() {
  const [article, setArticle] = useState({});
  const [overlay, setOverlay] = useState(false);
  const { id } = useParams();
  // استرجاع مقاله حسب اللينك
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setOverlay(true);
        const response = await api.get(`/getPostByUrl/${id}`);
        setArticle(response.data.data.posts[0]);
      } catch (error) {
        setArticle("");
        console.log(error);
      } finally {
        setOverlay(false);
      }
    };
    fetchArticle();
  }, [id]);

  // Set default SEO settings
  usePageSEO({
    title: article.Title || "مقالات",
    description: article.meta_description || "",
    keywords: article.key_words ? article.key_words.split(",") : [],
  });
  return (
    <>
      <Header />
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {article ? (
            <>
              <h2 className="text-center title-page py-1 pb-2 container my-3">
                {article.Title}
              </h2>
              <Container dir="rtl">
                <Row className="detailes-page">
                  <Col>
                    <div style={{ position: "relative" }}>
                      <img
                        src={article.Article_image}
                        alt={article.Title}
                        className="main-title-img"
                      />
                      <span
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          right: "0px",
                        }}
                      >
                        <Link
                          to={`/Blogs/${article.category_name}`}
                          className="categoryLink"
                        >
                          {article.category_name}
                        </Link>
                      </span>
                    </div>

                    <div className="rtl mt-4">
                      <div
                      className="articleCont"
                        dangerouslySetInnerHTML={{
                          __html: article.Article_body,
                        }}
                      />
                    </div>
                    {article.tags && article.tags.length > 0 ? (
                      <div className="tag-cont">
                        {article.tags.map((tag) => (
                          <Button
                            as={Link}
                            to={`/Blogs/tags/${tag}`}
                            variant="outline-info"
                            className="tagBtn"
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <Alert key="danger" className="text-center" variant="danger">
              404 عفوا, المدونة ليست موجوده
            </Alert>
          )}
          <hr />
          <Container>
            <CommentCard post_id={article.id} />
            <hr />
            <AddComment id={article.id} />
          </Container>
          <Footer />
          <Share
            text={`مدونه عن ${article.Title} فى موقع فارندا`}
            url={`http://varnda.com/Blog/${encodeURIComponent(id)}`}
          />
        </>
      )}
    </>
  );
}
