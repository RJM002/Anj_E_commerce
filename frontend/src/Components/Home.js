import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import './home.css'
import TodoWrapper from "../ToDoComponents/TodoWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Carousel, Card, Row, Col, Button } from 'react-bootstrap';
import HomeCarousel from "./Carousel";
import { Margin } from "@mui/icons-material";

// Sample product data
const products = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1', price: '$20', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', description: 'Description for Product 2', price: '$30', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3', price: '$40', imageUrl: 'https://via.placeholder.com/150' },
];

function Home({isAuthenticated,setIsAuthenticated,product}) {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);


  return (
    <>
      {/* <TodoWrapper /> */}
      {/* <ToastContainer /> */}
      <div>
 
   <HomeCarousel  />

      <Container className="mt-4">
        <h2>Products</h2>
        <Row>
          {product.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src='https://via.placeholder.com/150' />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}<br />
                    <strong>{product.price}</strong>
                  </Card.Text>
                  {/* <Button variant="primary">Add to Cart</Button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </>
  );
}

export default Home;
