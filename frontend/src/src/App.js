import React from 'react';
import { Helmet } from "react-helmet";
import { Positions,Postings } from './views/all'
import { Container, Row, Col, Nav, Navbar } from './components/react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="App">
        <Helmet>
            <title>{t('CV Composer')}</title>
        </Helmet>
        <Container>
          <Row className="mb-2">
            <Col>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">{t('CV Composer')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/postings">{t('Postings')}</Nav.Link>
                    <Nav.Link as={Link} to="/positions">{t('Positions')}</Nav.Link>
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
