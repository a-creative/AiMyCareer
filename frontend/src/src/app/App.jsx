import React from 'react';
import { Helmet } from "react-helmet";

import Postings from 'posting/Postings';
import PostingsCreate from 'posting/PostingsCreate'

import Experiences from 'experience/Experiences';
import ExperiencesCreate from 'experience/ExperiencesCreate'

import Skills from 'skill/Skills';
import SkillsCreate from 'skill/SkillsCreate'

import SkillCategories from 'skillCategory/SkillCategories';
import SkillCategoriesCreate from 'skillCategory/SkillCategoriesCreate'

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

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)

class App extends React.Component {

  render() {

    const { t } = this.props;

    return (
      <BrowserRouter>
        <ErrorMessage />
        <div className="App">
          <Helmet>
              <title>{t('AiMyCareer')}</title>
          </Helmet>
          
          <Container>
            <Row className="mb-4">
              <Col>
                <Navbar bg="dark" variant="dark" expand="lg">
                  <Navbar.Brand as={Link} to="/">{t('AiMyCareer')}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    {this.props.loggedIn && 
                    <Nav className="mr-auto">
                          <Nav.Link as={Link} to="/postings">{t('Job postings')}</Nav.Link>
                          <Nav.Link as={Link} to="/experiences">{t('Job experiences')}</Nav.Link>
                          <Nav.Link as={Link} to="/skills">{t('Skill_plural')}</Nav.Link>
                          <Nav.Link as={Link} to="/skill-categories">{t('Skill category_plural')}</Nav.Link>
                    </Nav>}
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
                
                <Route path="/postings/create" render={(props) => <Page title={t('Create {{object_name}}', { object_name : t('job posting')})}><PostingsCreate {...props} /></Page>} />
                <Route path="/postings/edit/:id" render={(props) => <Page title={t('Edit {{object_name}}', { object_name : t('job posting')})}><PostingsCreate {...props} /></Page>} />
                <Route path="/postings">
                  <Page title={t('Job postings')}><Postings /></Page>
                </Route>

                <Route path="/skills/create" render={(props) => <Page title={t('Create {{object_name}}', { object_name : t('skill')})}><SkillsCreate {...props} /></Page>} />
                <Route path="/skills/edit/:id" render={(props) => <Page title={t('Edit {{object_name}}', { object_name : t('skill')})}><SkillsCreate {...props} /></Page>} />
                <Route path="/skills">
                  <Page title={t('Skill_plural')}><Skills /></Page>
                </Route>

                <Route path="/skill-categories/create" render={(props) => <Page title={t('Create {{object_name}}', { object_name : t('skill category')})}><SkillCategoriesCreate {...props} /></Page>} />
                <Route path="/skill-categories/edit/:id" render={(props) => <Page title={t('Edit {{object_name}}', { object_name : t('skill category')})}><SkillCategoriesCreate {...props} /></Page>} />
                <Route path="/skill-categories">
                  <Page title={t('Skill category_plural')}><SkillCategories /></Page>
                </Route>

                <Route path="/experiences/create" render={(props) => <Page title={t('Create {{object_name}}', { object_name : t('job experience')})}><ExperiencesCreate {...props} /></Page>} />
                <Route path="/experiences/edit/:id" render={(props) => <Page title={t('Edit {{object_name}}', { object_name : t('job experience')})}><ExperiencesCreate {...props} /></Page>} />
                <Route path="/experiences">
                  <Page title={t('Job experiences')}><Experiences /></Page>
                </Route>

                <Route path="/">
                  {this.props.loggedIn ? 
                      <Redirect to="/postings" />
                    : <Redirect to="/login" />
                  }
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
  loading: ( state.posting.loading || state.auth.loading || state.experience.loading || state.skill.loading || state.skillCategory.loading ),
  error: ( state.posting.error || state.auth.error || state.experience.error || state.skill.error || state.skillCategory.error ),
  loggedIn: state.auth.loggedIn,
});

export default connect(
  mapStateToProps,
  null
)(withTranslation()(App));
