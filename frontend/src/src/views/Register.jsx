import React from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from 'components/PageHeader';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { registerUser } from "store/actionCreators";
import { connect } from 'react-redux'


class Register extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {

            user : {
                firstName : '',
                lastName : '',
                username : '',
                password : '',
                passwordConfirmation : ''
            }

            
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();

        let history = this.props.history;

        this.props.registerUser( this.state.user, function( user ) {

            history.push('/');
 
        })
    }

    handleInputChange(e){
        e.preventDefault();
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var user = {...this.state.user}
        user[name] = value;
        this.setState({user})
    }

    render() {
        const { t } = this.props;

        return <Row>
          <Helmet>
              <title>{t('Job postings')} - {t('Register new user')}</title>
          </Helmet>
          <Col>
              <PageHeader title={t('Register new user')} />
              <Row className="mb-3">
                  <Col sm="4">
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="firstNameField">
                              <Form.Label htmlFor="firstNameField">{t('First name')}</Form.Label>
                              <Form.Control type="text" id="firstNameField" name="firstName" value={this.state.user.firstName} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="lastNameField">
                              <Form.Label htmlFor="lastNameField">{t('Last name')}</Form.Label>
                              <Form.Control type="text" id="lastNameField" name="lastName" value={this.state.user.lastName} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="usernameField">
                              <Form.Label htmlFor="usernameField">{t('Select username')}</Form.Label>
                              <Form.Control type="text" id="usernameField" name="username" value={this.state.user.username} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="passwordField">
                              <Form.Label htmlFor="passwordField">{t('Select password')}</Form.Label>
                              <Form.Control type="password" id="passwordField" name="password" value={this.state.user.password} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="passwordConfirmationField">
                              <Form.Label htmlFor="passwordConfirmationField">{t('Confirm selected password')}</Form.Label>
                              <Form.Control type="password" id="passwordConfirmationField" name="passwordConfirmation" value={this.state.user.passwordConfirmation} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group>
                              <Button variant="primary" type="submit">{t('Register')}</Button>{' '}
                              <Link to="/">
                                  <Button variant="light">{t('Back')}</Button>
                              </Link>
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
          </Col>
      </Row>;
    }

  
}

const mapDispatchToProps = {
    registerUser
};

export default connect(
    null,
    mapDispatchToProps
  )(withTranslation()(Register));