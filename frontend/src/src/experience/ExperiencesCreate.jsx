import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { formatNormalizedDate } from '_shared/helpers.js';
import { insertExperience, updateExperience } from "experience/_store/act.experience";
import { withRouter  } from "react-router-dom";

class ExperiencesCreate extends React.Component {

  constructor(props) {

    super(props);

    let initExperience = {
      ...{},
      ...props.experience
    }

    this.state = {
      experience : initExperience
    }

    this.state.experience.endedDate = formatNormalizedDate(initExperience.endedDate, 'YYYY-MM-DD');
    this.state.experience.startedDate = formatNormalizedDate(initExperience.startedDate, 'YYYY-MM-DD');

  }
  
  handleInputChange = ( event ) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ 
        experience : {
          ...this.state.experience,
          [name]: value
        }
    });

  }

  handleSubmit = ( event ) => {
    event.preventDefault();

    if ( this.props.match.params.id ) {

      this.props.updateExperience( this.state.experience, this.props.loggedIn, () => {
        this.props.history.push('/experiences');
      });

    } else {
      
      this.props.insertExperience( this.state.experience, this.props.loggedIn, () => {
        this.props.history.push('/experiences'); 
      });

    }

    return  false;
  }
  
  render() {

    const { t } = this.props;

    return <Row>
    <Col>
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group controlId="employerField">
              <Form.Label>{t('Employer')}</Form.Label>
              <Form.Control type="text" name="employer" value={this.state.experience.employer || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="jobTitleField">
              <Form.Label>{t('Job title')}</Form.Label>
              <Form.Control type="text" name="jobTitle" value={this.state.experience.jobTitle || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="startedDateField">
              <Form.Label>{t('Experience date')}</Form.Label>
              <Form.Control type="date" name="startedDate" value={this.state.experience.startedDate || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="endedDateField">
              <Form.Label>{t('Application deadline')}</Form.Label>
              <Form.Control type="date" name="endedDate" value={this.state.experience.endedDate || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button variant="primary" type="submit">{t('Save')}</Button>
            { ' ' }
            <Button onClick={ (e) => { this.props.history.goBack();} } variant="light" type="submit">{t('Cancel')}</Button>
          </Col>
        </Form.Row>
      </Form>
    </Col>
  </Row>;

  }

}

function selectExperience( rootReducer, experienceId ) {

  let experiences = rootReducer.experience.experiences;
  let experience = experiences.filter( function( experience ) { return experience.id === experienceId })[0];

  return experience;
}


function mapStateToProps(rootReducer, ownProps) {

  let r = {
      loggedIn : rootReducer.auth.loggedIn
  }

  if ( ownProps.match ) {
    r.experience = selectExperience(rootReducer, +ownProps.match.params.id )
  } else {
    r.experience = {}
  }  

  return r;
}

const mapDispatchToProps = {
  updateExperience,
  insertExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(ExperiencesCreate)));