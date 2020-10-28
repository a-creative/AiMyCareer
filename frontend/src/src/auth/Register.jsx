import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { registerUser } from "auth/_store/act.auth";
import { connect } from 'react-redux'
import { validateFormByLaravelResponse } from '_shared/helpers.js';
import { withRouter  } from "react-router-dom";

class Register extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            user : {
                firstName : '',
                lastName : '',
                email : '',
                password : '',
                passwordConfirmation : ''
            },
            errors :  {}
        }

    }

    handleSubmit = ( e ) => {
        e.preventDefault();

        this.props.registerUser( this.state.user, ( responseData ) => {

            validateFormByLaravelResponse({
                component: this, 
                ...{responseData}, 
                onSuccess: () => {
                    this.props.history.push('/');
                },
                stateSelectorId : 'user'
            });
        })
    }

    handleInputChange = (e) => {
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
          <Col>
              <Row className="mb-3">
                  <Col sm="5">
                      <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated} >
                          <Form.Group controlId="firstNameField">
                              <Form.Label>{t('First name')}</Form.Label>
                              <Form.Control required isInvalid={this.state.errors.firstName} type="text" name="firstName" autoComplete="given-name" value={this.state.user.firstName} onChange={this.handleInputChange}></Form.Control>
                              <Form.Control.Feedback type="invalid">{this.state.errors.firstName}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="lastNameField">
                              <Form.Label>{t('Last name')}</Form.Label>
                              <Form.Control isInvalid={this.state.errors.lastName} required type="text" name="lastName" autoComplete="family-name" value={this.state.user.lastName} onChange={this.handleInputChange}></Form.Control>
                              <Form.Control.Feedback type="invalid">{this.state.errors.lastName}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="emailField">
                              <Form.Label>{t('Your e-mail address')}</Form.Label>
                              <Form.Control required isInvalid={this.state.errors.email} type="email" name="email" autoComplete="email" value={this.state.user.email} onChange={this.handleInputChange}></Form.Control>
                              <Form.Control.Feedback type="invalid">{this.state.errors.email}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="passwordField">
                              <Form.Label>{t('Select password')}</Form.Label>
                              <Form.Control  required isInvalid={this.state.errors.password} type="password" name="password" value={this.state.user.password} onChange={this.handleInputChange}></Form.Control>
                              <Form.Control.Feedback type="invalid">{this.state.errors.password}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="passwordConfirmationField">
                              <Form.Label>{t('Confirm selected password')}</Form.Label>
                              <Form.Control required isInvalid={this.state.errors.passwordConfirmation} type="password" name="passwordConfirmation" value={this.state.user.passwordConfirmation} onChange={this.handleInputChange}></Form.Control>
                              <Form.Control.Feedback type="invalid">{this.state.errors.passwordConfirmation}</Form.Control.Feedback>
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
  )(withTranslation()(withRouter(Register)));