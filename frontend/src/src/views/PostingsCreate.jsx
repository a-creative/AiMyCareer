import React from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { formatNormalizedDate } from '../helpers';

class PostingsCreate extends React.Component {

  constructor(props) {

    super(props);

    let page_title_t = ( typeof this.props.match === 'undefined' ? 'Create job posting' : 'Edit job posting' )
    let posting = props.obj.posting;

    this.state = {
      ...posting,
      ...{ page_title_t }
    }

    this.state.deadline_date = formatNormalizedDate(posting.deadline_date, 'YYYY-MM-DD');
    this.state.posted_date = formatNormalizedDate(posting.posted_date, 'YYYY-MM-DD');

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  render() {

    const { t } = this.props;

    return <Row>
    <Helmet>
      <title>{t(this.state.page_title_t)} - {t('Job Finder')}</title>
    </Helmet>
    <Col>
      <PageHeader title={t(this.state.page_title_t)} />
      <Form onSubmit={this.handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Group controlId="job_title">
            <Form.Label>{t('Job title')}</Form.Label>
            <Form.Control type="text" value={this.state.job_title || ''} onChange={this.handleChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="employer">
            <Form.Label>{t('Employer')}</Form.Label>
            <Form.Control type="text" value={this.state.employer || ''} onChange={this.handleChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="ext_link">
            <Form.Label>{t('Link')}</Form.Label>
            <Form.Control type="url" value={this.state.ext_link || ''} onChange={this.handleChange}></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="posted_date">
            <Form.Label>{t('Posting date')}</Form.Label>
            <Form.Control type="date" value={this.state.posted_date || ''} onChange={this.handleChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="deadline_date">
            <Form.Label>{t('Application deadline')}</Form.Label>
            <Form.Control type="date" value={this.state.deadline_date || ''} onChange={this.handleChange}></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <fieldset>
        <Form.Label as="legend">
          {t('Work location')}
        </Form.Label>
        <Form.Row>
          <Col lg="2">
            <Form.Group controlId="location_postal_code">
              <Form.Label>{t('Postal code')}</Form.Label>
              <Form.Control type="text" value={this.state.location_postal_code || ''} onChange={this.handleChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="location_city">
              <Form.Label>{t('City')}</Form.Label>
              <Form.Control type="text" value={this.state.location_city || ''} onChange={this.handleChange}></Form.Control>
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
            <Form.Group controlId="contact_name">
              <Form.Label>{t('Name')}</Form.Label>
              <Form.Control type="text" value={this.state.contact_name || ''} onChange={this.handleChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contact_job_title">
              <Form.Label>{t('Job title')}</Form.Label>
              <Form.Control type="text" value={this.state.contact_job_title || ''} onChange={this.handleChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contact_details">
              <Form.Label>{t('Details')}</Form.Label>
              <Form.Control type="text" value={this.state.contact_details || ''} onChange={this.handleChange}></Form.Control>
            </Form.Group>
          </Col>

        </Form.Row>
      </fieldset>
      <Form.Row>
          <Col>
            <Form.Group controlId="content_raw">
              <Form.Label>{t('Raw text content')}</Form.Label>
              <Form.Control as="textarea" rows={2} value={this.state.content_raw || ''} onChange={this.handleChange}/>
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

function mapStateToProps(root_reducer, ownProps) {

  if ( typeof ownProps.match === 'undefined' ) {
    return {
      obj: {
        posting : {}
      }
    }
  } else {
    return {
      obj: selectPosting(root_reducer, +ownProps.match.params.id )
    };
  }  
}

function selectPosting( root_reducer, posting_id ) {

  let postings = root_reducer.posting.postings;
  let posting = postings.filter( function( posting ) { return posting.id === posting_id })[0];

  return {
    posting: posting
  }
}


export default connect(mapStateToProps)(withTranslation()(PostingsCreate));