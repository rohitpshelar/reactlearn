import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export default function Navbar(props) {
  return (
    // <div><nav variant="tabs"  className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <a className="navbar-brand" href='/'>Rohit Shelar Tools - </a>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/textform">Text Changer</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/mileage">Mileage Calculator</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/FD">Fix Deposit</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/Rent">Rent</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/RentTaxCalculator">Rent Tax Calculator</Link>
    //         </li>

    //       </ul>
    //     </div>
    //   </div>
    // </nav></div>

    <Nav justify data-bs-theme="dark" variant="tabs" defaultActiveKey="/RentTaxCalculator">
      {/* <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <Nav.Link as={Link} to="/textform">Text Changer</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/mileage">Mileage Calculator</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/FD">Fix Deposit</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Rent">Rent</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/RentTaxCalculator">Rent Tax Calculator</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string
}