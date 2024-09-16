import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./ArticleCards.css"

export default function ArticleCards({articles}) {
  return (
    <Container>
      <Row className="g-3">
        {articles.map((article) => (
          <Col sm={12} md={6} lg={4} key={article.id}>
            <Card as={Link} to={`/Blog/${article.Article_url}`} >
              <Card.Img variant="top" src={article.Article_image} />
              <Card.Body>
                <Card.Title>{article.Title}</Card.Title>
                <Card.Text className='article-body'>
                  <div className="rtl miniwords" dangerouslySetInnerHTML={{ __html: article.Article_body }} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
