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
                repeatPassword : ''
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
                  <Col sm="3">
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group>
                              <Form.Label>{t('First name')}</Form.Label>
                              <Form.Control type="text" name="firstName" value={this.state.user.firstName} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group>
                              <Form.Label>{t('Last name')}</Form.Label>
                              <Form.Control type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group>
                              <Form.Label>{t('Username')}</Form.Label>
                              <Form.Control type="text" name="username" value={this.state.user.username} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group>
                              <Form.Label htmlFor="password">{t('Password')}</Form.Label>
                              <Form.Control type="password" id="password" name="password" value={this.state.user.password} onChange={this.handleInputChange}></Form.Control>
                          </Form.Group>
                          <Form.Group>
                              <Form.Label htmlFor="repeatPassword">{t('Repeat password')}</Form.Label>
                              <Form.Control type="password" id="repeatPassword" name="repeatPassword" value={this.state.user.repeatPassword} onChange={this.handleInputChange}></Form.Control>
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