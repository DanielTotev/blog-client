import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function MainNavbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <Navbar>
      {isLoggedIn() && (
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/post/add" className="nav-link">
            Add Post
          </Link>
          <Link className="nav-link" onClick={logout}>
            Logout
          </Link>
        </Nav>
      )}
      {!isLoggedIn() && (
        <Nav>
          <Link to="/register" className="nav-link">
            Register
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </Nav>
      )}
    </Navbar>
  );
}
