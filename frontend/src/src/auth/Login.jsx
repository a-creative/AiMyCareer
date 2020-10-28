import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { loginUser } from "auth/_store/act.auth";
import { connect } from 'react-redux'
import { validateFormByLaravelResponse } from '_shared/helpers.js';
import { withRouter  } from "react-router-dom";

class Login extends React.Component{

    constructor( props ) {
        super( props );

        this.state = {
            user : {
                email : '',
                password : '',
            },
            formInvalid: false,
            formMessage : '',
            errors : {}
        }

    }

    handleSubmit = (e) => {

        e.preventDefault();

        this.props.loginUser( this.state.user,( responseData ) => {

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
                            <Form.Group controlId="emailField">
                                <Form.Label>{t('Your e-mail address')}</Form.Label>
                                <Form.Control required isInvalid={this.state.errors.email} type="email" name="email" value={this.state.user.email} onChange={this.handleInputChange}></Form.Control>
                                <Form.Control.Feedback type="invalid">{this.state.errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="passwordField">
                                <Form.Label>{t('Your password')}</Form.Label>
                                <Form.Control required isInvalid={this.state.errors.password} type="password" name="password" autoComplete="current-password" value={this.state.user.password} onChange={this.handleInputChange}></Form.Control>
                                <Form.Control.Feedback type="invalid">{this.state.errors.password}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check 
                                            type="checkbox"
                                            id="rememberPasswordField"
                                            label={t("Remember password")}
                                        />
                            </Form.Group>
                            <Form.Group>
                                <Link to="/forgot-password">{t('Forgot password')}?</Link>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">{t('Login')}</Button>{' '}
                                <Link to="/register">
                                    <Button variant="light">{t('Register')}</Button>
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
    loginUser
};

export default connect(
    null,
    mapDispatchToProps
  )(withTranslation()(withRouter(Login)));