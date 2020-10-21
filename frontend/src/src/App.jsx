import React from 'react';
import { Helmet } from "react-helmet";
import { Postings, PostingsCreate, Login, ForgotPassword, Register } from 'views'
import { Container, Row, Col, Nav, Navbar, Form, Button,NavDropdown} from 'components/react-bootstrap'
import Spinner from 'components/Spinner'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { fetchPostings } from "store/actionCreators";
import { connect } from 'react-redux'
import 'App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchPostings();
  }

  render() {

    const { t } = this.props;

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
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/register" component={Register} />
                <Route path="/postings/create" render={(props) => <PostingsCreate {...props} />} />
                <Route path="/postings/edit/:id" render={(props) => <PostingsCreate {...props} />} />
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
}

const mapStateToProps = state => ({
  loading: state.posting.loading
});


const mapDispatchToProps = {
  fetchPostings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(App));
