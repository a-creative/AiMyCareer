import React from 'react';
import { Helmet } from "react-helmet";
import { Postings, PostingsCreate } from './views'
import { Container, Row, Col, Nav, Navbar } from './components/react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="App">
        <Helmet>
            <title>{t('Job Finder')}</title>
        </Helmet>
        <Container>
          <Row className="mb-4">
            <Col>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">{t('Job Finder')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/postings">{t('Job postings')}</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col>
            <Switch>
              <Route path="/postings/create">
                <PostingsCreate />
              </Route>
              <Route path="/postings/edit/:id" render={(props : any) => <PostingsCreate {...props} />} />
              <Route path="/postings">
                <Postings />
              </Route>
              <Route path="/">
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
