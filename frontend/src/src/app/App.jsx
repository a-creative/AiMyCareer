import React from 'react';
import { Helmet } from "react-helmet";

import Postings from 'posting/Postings';
import PostingsCreate from 'posting/PostingsCreate'

import Experiences from 'experience/Experiences';
import ExperiencesCreate from 'experience/ExperiencesCreate'

import Login from 'auth/Login'
import ForgotPassword from 'auth/ForgotPassword'
import Register from 'auth/Register'

import { Container, Row, Col, Nav, Navbar} from '_shared/react-bootstrap'
import Spinner from '_shared/_components/Spinner'
import ErrorMessage from 'error/ErrorMessage'
import Page from './Page'
import PageFooter from './PageFooter';
import { BrowserRouter, Redirect, Switch, Route, Link  } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import 'app/App.css';

class App extends React.Component {

  render() {

    const { t } = this.props;

    return (
      <BrowserRouter>
        <ErrorMessage />
        <div className="App">
          <Helmet>
              <title>{t('Job Finder')}</title>
          </Helmet>
          
          <Container>
            <Row className="mb-4">
              <Col>
                <Navbar bg="dark" variant="dark" expand="lg">
                  <Navbar.Brand as={Link} to="/">{t('Job Finder')}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      {this.props.loggedIn && <Nav.Link as={Link} to="/postings">{t('Job postings')}</Nav.Link>}
                      {this.props.loggedIn && <Nav.Link as={Link} to="/experiences">{t('Job experiences')}</Nav.Link>}
                    </Nav>
                    <Nav>
                      <Spinner show={this.props.loading} />{' '}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
            </Row>
            <Row>
              <Col>
              <Switch>
                <Route path="/login"><Page title={t('Login')}><Login /></Page></Route>
                <Route path="/forgot-password"><Page title={t('Forgot password')}><ForgotPassword /></Page></Route>
                <Route path="/register"><Page title={t('Register new user')}><Register /></Page></Route>
                
                <Route path="/postings/create" render={(props) => <Page title={t('Create job posting')}><PostingsCreate {...props} /></Page>} />
                <Route path="/postings/edit/:id" render={(props) => <Page title={t('Edit job posting')}><PostingsCreate {...props} /></Page>} />
                <Route path="/postings">
                  <Page title={t('Job postings')}><Postings /></Page>
                </Route>

                <Route path="/experiences/create" render={(props) => <Page title={t('Create job experience')}><ExperiencesCreate {...props} /></Page>} />
                <Route path="/experiences/edit/:id" render={(props) => <Page title={t('Edit job experience')}><ExperiencesCreate {...props} /></Page>} />
                <Route path="/experiences">
                  <Page title={t('Job experiences')}><Experiences /></Page>
                </Route>

                <Route path="/">
                  {this.props.loggedIn &&<Redirect to="/postings" />}
                  {!this.props.loggedIn && <Redirect to="/login" />}
                </Route>
              </Switch>
              </Col>
            </Row>
          </Container>
          <PageFooter />
        </div>
      </BrowserRouter>
    );

  }
}

const mapStateToProps = state => ({
  loading: ( state.posting.loading || state.auth.loading || state.experience.loading ),
  error: ( state.posting.error || state.auth.error || state.experience.error ),
  loggedIn: state.auth.loggedIn,
});

export default connect(
  mapStateToProps,
  null
)(withTranslation()(App));
