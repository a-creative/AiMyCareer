import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { formatNormalizedDate } from '_shared/helpers.js';
import { insertPosting, updatePosting } from "posting/_store/act.posting";
import { withRouter  } from "react-router-dom";

class PostingsCreate extends React.Component {

  constructor(props) {

    super(props);

    let initPosting = {
      ...{},
      ...props.posting
    }

    this.state = {
      posting : initPosting
    }

    this.state.posting.deadlineDate = formatNormalizedDate(initPosting.deadlineDate, 'YYYY-MM-DD');
    this.state.posting.postedDate = formatNormalizedDate(initPosting.postedDate, 'YYYY-MM-DD');

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleInputChange = ( event ) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ 
        posting : {
          ...this.state.posting,
          [name]: value
        }
    });

  }

  handleSubmit = ( event ) => {
    event.preventDefault();

    if ( this.props.match.params.id ) {

      this.props.updatePosting( this.state.posting, this.props.loggedIn, () => {
        this.props.history.push('/');
      });

    } else {
      
      this.props.insertPosting( this.state.posting, this.props.loggedIn, () => {
        this.props.history.push('/'); 
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
            <Form.Control type="text" name="employer" value={this.state.posting.employer || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="jobTitleField">
            <Form.Label>{t('Job title')}</Form.Label>
            <Form.Control type="text" name="jobTitle" value={this.state.posting.jobTitle || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="extLinkField">
            <Form.Label>{t('Link')}</Form.Label>
            <Form.Control type="url" name="extLink" value={this.state.posting.extLink || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="postedDateField">
            <Form.Label>{t('Posting date')}</Form.Label>
            <Form.Control type="date" name="postedDate" value={this.state.posting.postedDate || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="deadlineDateField">
            <Form.Label>{t('Application deadline')}</Form.Label>
            <Form.Control type="date" name="deadlineDate" value={this.state.posting.deadlineDate || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <fieldset>
        <Form.Label as="legend">
          {t('Work location')}
        </Form.Label>
        <Form.Row>
          <Col lg="2">
            <Form.Group controlId="locationPostalCodeField">
              <Form.Label>{t('Postal code')}</Form.Label>
              <Form.Control type="text" name="locationPostalCode" value={this.state.posting.locationPostalCode || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="locationCityField">
              <Form.Label>{t('City')}</Form.Label>
              <Form.Control type="text" name="locationCity" value={this.state.posting.locationCity || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
      </fieldset>
      <fieldset>
        <Form.Label as="legend">
          {t('Contact information')}
        </Form.Label>
        <Form.Row>
          <Col>
            <Form.Group controlId="contactNameField">
              <Form.Label>{t('Name')}</Form.Label>
              <Form.Control type="text" name="contactName" value={this.state.posting.contactName || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contactJobTitleField">
              <Form.Label>{t('Job title')}</Form.Label>
              <Form.Control type="text" name="contactJobTitle" value={this.state.posting.contactJobTitle || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contactDetailsField">
              <Form.Label>{t('Details')}</Form.Label>
              <Form.Control type="text" name="contactDetails" value={this.state.posting.contactDetails || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>

        </Form.Row>
      </fieldset>
      <Form.Row>
          <Col>
            <Form.Group controlId="contentRawField">
              <Form.Label>{t('Raw text content')}</Form.Label>
              <Form.Control as="textarea" rows={2} name="contentRaw" value={this.state.posting.contentRaw || ''} onChange={this.handleInputChange}/>
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

function selectPosting( rootReducer, postingId ) {

  let postings = rootReducer.posting.postings;
  let posting = postings.filter( function( posting ) { return posting.id === postingId })[0];

  return posting;
}


function mapStateToProps(rootReducer, ownProps) {

  let r = {
      loggedIn : rootReducer.auth.loggedIn
  }

  if ( ownProps.match ) {
    r.posting = selectPosting(rootReducer, +ownProps.match.params.id )
  } else {
    r.posting = {}
  }  

  return r;
}

const mapDispatchToProps = {
  updatePosting,
  insertPosting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(PostingsCreate)));