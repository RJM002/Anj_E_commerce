import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';
import UserInfo from '../ToDoComponents/UserInfo';
import SearchBar from './SearchBar';

const Navigation = ({isAuthenticated,setIsAuthenticated,setProduct,product}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/* <img
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          /> */}
          <div>LOGO</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            <SearchBar product={product} setProduct={setProduct}/>
           {isAuthenticated ?<>
            <UserInfo setIsAuthenticated={setIsAuthenticated} />
           </>:<>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
           </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;