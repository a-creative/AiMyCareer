import React from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from 'components/PageHeader';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { formatNormalizedDate } from 'helpers';
import { insertPosting, updatePosting } from "store/actionCreators";

class PostingsCreate extends React.Component {

  constructor(props) {

    super(props);

    let pageTitleT = ( typeof this.props.match === 'undefined' ? 'Create job posting' : 'Edit job posting' )
    let initPosting = {
      ...{
        
      },
      ...props.obj.posting
    }

    this.state = {
      posting : initPosting,
      ...{ pageTitleT }
    }

    this.state.posting.deadlineDate = formatNormalizedDate(initPosting.deadlineDate, 'YYYY-MM-DD');
    this.state.posting.postedDate = formatNormalizedDate(initPosting.postedDate, 'YYYY-MM-DD');

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleInputChange(event) {

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

  handleSubmit(event) {
    event.preventDefault();
    const history = this.props.history;
    if ( typeof this.props.match.params.id === 'undefined' ) {

      this.props.insertPosting( this.state.posting, function() {
        history.push('/'); 
      });

    } else {
      
      this.props.updatePosting( this.state.posting, function() {
        history.push('/');
      })

    }

    return  false;
  }
  
  render() {

    const { t } = this.props;

    return <Row>
    <Helmet>
      <title>{t(this.state.pageTitleT)} - {t('Job Finder')}</title>
    </Helmet>
    <Col>
      <PageHeader title={t(this.state.pageTitleT)} />
      <Form onSubmit={this.handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Group controlId="employerField">
            <Form.Label htmlFor="employerField">{t('Employer')}</Form.Label>
            <Form.Control type="text" id="employerField" name="employer" value={this.state.posting.employer || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="jobTitleField">
            <Form.Label htmlFor="jobTitleField">{t('Job title')}</Form.Label>
            <Form.Control type="text" id="jobTitleField" name="jobTitle" value={this.state.posting.jobTitle || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="extLinkField">
            <Form.Label htmlFor="extLinkField">{t('Link')}</Form.Label>
            <Form.Control type="url" id="extLinkField" name="extLink" value={this.state.posting.extLink || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="postedDateField">
            <Form.Label htmlFor="postedDateField">{t('Posting date')}</Form.Label>
            <Form.Control type="date" id="postedDateField" name="postedDate" value={this.state.posting.postedDate || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="deadlineDateField">
            <Form.Label htmlFor="deadlineDateField">{t('Application deadline')}</Form.Label>
            <Form.Control type="date" id="deadlineDateField" name="deadlineDate" value={this.state.posting.deadlineDate || ''} onChange={this.handleInputChange}></Form.Control>
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
              <Form.Label htmlFor="locationPostalCodeField">{t('Postal code')}</Form.Label>
              <Form.Control type="text" id="locationPostalCodeField" name="locationPostalCode" value={this.state.posting.locationPostalCode || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="locationCityField">
              <Form.Label htmlFor="locationCityField">{t('City')}</Form.Label>
              <Form.Control type="text" id="locationCityField" name="locationCity" value={this.state.posting.locationCity || ''} onChange={this.handleInputChange}></Form.Control>
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
              <Form.Label htmlFor="contactNameField">{t('Name')}</Form.Label>
              <Form.Control type="text" id="contactNameField" name="contactName" value={this.state.posting.contactName || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contactJobTitleField">
              <Form.Label htmlFor="contactJobTitleField">{t('Job title')}</Form.Label>
              <Form.Control type="text" id="contactJobTitleField" name="contactJobTitle" value={this.state.posting.contactJobTitle || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contactDetailsField">
              <Form.Label htmlFor="contactDetailsField">{t('Details')}</Form.Label>
              <Form.Control type="text" id="contactDetailsField" name="contactDetails" value={this.state.posting.contactDetails || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>

        </Form.Row>
      </fieldset>
      <Form.Row>
          <Col>
            <Form.Group controlId="contentRawField">
              <Form.Label htmlFor="contentRawField">{t('Raw text content')}</Form.Label>
              <Form.Control as="textarea" rows={2} id="contentRawField" name="contentRaw" value={this.state.posting.contentRaw || ''} onChange={this.handleInputChange}/>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button variant="primary" type="submit">{t('Save')}</Button>
          </Col>
        </Form.Row>
      </Form>
    </Col>
  </Row>;

  }

}

function mapStateToProps(rootReducer, ownProps) {

  if ( typeof ownProps.match === 'undefined' ) {
    return {
      obj: {
        posting : {}
      }
    }
  } else {
    return {
      obj: selectPosting(rootReducer, +ownProps.match.params.id )
    };
  }  
}

const mapDispatchToProps = {
  updatePosting,
  insertPosting
};

function selectPosting( rootReducer, postingId ) {

  let postings = rootReducer.posting.postings;
  let posting = postings.filter( function( posting ) { return posting.id === postingId })[0];

  return {
    posting: posting
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PostingsCreate));