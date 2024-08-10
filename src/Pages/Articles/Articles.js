import React, { useEffect, useState } from 'react'
import "./Articles.css"
import ArticleCards from '../../Components/Articles/ArticleCards'
import api from "../../API/ApiLink.js";
import { Pagination } from 'react-bootstrap';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.post(`/getAPosts`,{page:currentPage});
        setArticles(response.data.data.posts);
        setTotalPages(response.data.data.total_pages);
      } catch (error) {
        setArticles([]);
        console.log(error);
      }
    };
    fetchArticle();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className="text-center title-page py-1 pb-2 container my-3">جميع المدونات</h2>
      <ArticleCards articles={articles} />
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination dir='ltr'>
          <Pagination.Prev 
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} 
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item 
              key={index + 1} 
              active={index + 1 === currentPage} 
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} 
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </>
  )
}
