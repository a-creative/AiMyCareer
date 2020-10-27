import React from 'react';
import { withTranslation } from 'react-i18next';
import PageHeader from 'components/PageHeader';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { Link, browserHistory } from "react-router-dom";
import { loginUser } from "store/actionCreators";
import { connect } from 'react-redux'
import { formValidate } from 'helpers.js';

class Login extends React.Component{

    constructor( props ) {
        super( props );

        this.state = {
            validate: true,
            user : {
                email : '',
                password : '',
            },
            formInvalid: false,
            formMessage : '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {

        e.preventDefault();

        this.setState({ 'validated' : true });

        this.props.loginUser( this.state.user,( userInfo ) => {

            formValidate( { 
                component : this, 
                serverData: userInfo, 
                onSuccess : () => {
                    this.props.history.push('/');
                }
            });
 
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
            <Col>
                <PageHeader title={t('Login')} />
                <Row className="mb-3">
                    <Col sm="5">
                        <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated} >
                            <Form.Group controlId="emailField">
                                <Form.Label>{t('Your e-mail address')}</Form.Label>
                                <Form.Control required type="email" name="email" value={this.state.user.email} onChange={this.handleInputChange}></Form.Control>
                                { this.state.emailInvalid && <Form.Control.Feedback type="invalid">{this.state.emailInvalidMessage}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group controlId="passwordField">
                                <Form.Label>{t('Your password')}</Form.Label>
                                <Form.Control required type="password" name="password" value={this.state.user.password} onChange={this.handleInputChange}></Form.Control>
                                { this.state.passwordInvalid && <Form.Control.Feedback type="invalid">{this.state.passwordInvalidMessage}</Form.Control.Feedback>}
                                { this.state.formInvalid && <Form.Control.Feedback variant="danger">{t(this.state.formInvalidMessage)}</Form.Control.Feedback> }
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
  )(withTranslation()(Login));