import React from 'react';
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
                email : '',
                password : '',
                passwordConfirmation : ''
            }
            
        }

    }

    handleSubmit = ( e ) => {
        e.preventDefault();

        this.props.registerUser( this.state.user, ( user ) => {

            this.props.history.push('/');
 
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
              <PageHeader title={t('Register new user')} />
              <Row className="mb-3">
                  <Col sm="5">
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="firstNameField">
                              <Form.Label>{t('First name')}</Form.Label>
                              <Form.Control type="text" name="firstName" value={this.state.user.firstName} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="lastNameField">
                              <Form.Label>{t('Last name')}</Form.Label>
                              <Form.Control type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="emailField">
                              <Form.Label>{t('Your e-mail address')}</Form.Label>
                              <Form.Control type="email" name="email" value={this.state.user.email} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="passwordField">
                              <Form.Label>{t('Select password')}</Form.Label>
                              <Form.Control type="password" name="password" value={this.state.user.password} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="passwordConfirmationField">
                              <Form.Label>{t('Confirm selected password')}</Form.Label>
                              <Form.Control type="password" name="passwordConfirmation" value={this.state.user.passwordConfirmation} onChange={this.handleInputChange}></Form.Control>
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