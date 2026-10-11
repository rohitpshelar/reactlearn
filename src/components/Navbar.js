import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export default function Navbar(props) {
  return (

    <Nav justify data-bs-theme="dark" variant="tabs" defaultActiveKey="/RentTaxCalculator">
      <Nav.Item>
        <Nav.Link as={Link} to="/textform" style={{ color: '#fff' }}>Text Changer</Nav.Link>
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