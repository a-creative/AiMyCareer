import React from 'react';
import {Helmet} from "react-helmet";

import Positions from './positions/Positions';
import Postings from './postings/Postings';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
            <title>CV Composer</title>
        </Helmet>
        <Container>
          <Row className="mb-2">
            <Col>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/postings">Postings</Nav.Link>
                    <Nav.Link as={Link} to="/positions">Positions</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col>
            <Switch>
              <Route path="/positions">
                <Positions />
              </Route>
              <Route path="/">
                <Postings />
              </Route>
              <Route path="/postings">
                <Postings />
              </Route>
            </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
