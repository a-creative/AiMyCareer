import React from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from 'components/PageHeader';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { authUser } from "store/actionCreators";
import { connect } from 'react-redux'



class Login extends React.Component{

    render() {

        const { t } = this.props;

        return <Row>
            <Helmet>
                <title>{t('Job postings')} - {t('Login')}</title>
            </Helmet>
            <Col>
                <PageHeader title={t('Login')} />
                <Row className="mb-3">
                    <Col sm="3">
                        <Form>
                            <Form.Group>
                                <Form.Label>{t('Username')}</Form.Label>
                                <Form.Control type="text" name="username"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password">{t('Password')}</Form.Label>
                                <Form.Control type="password" id="password" aria-describedby="passwordHelpBlock"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check 
                                            type="checkbox"
                                            id="remember-password"
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
   authUser
};

export default connect(
    null,
    mapDispatchToProps
  )(withTranslation()(Login));