import React from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class PostingsCreate extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
        page_title_t : '',
        job_title : '',
        employer : '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {

      if ( typeof this.props.match === 'undefined' ) {
        this.setState( { page_title_t : 'Create job posting' })
      } else {
        this.setState( { page_title_t : 'Edit job posting'} );
      }

      let { posting } = this.props.obj

      this.setState( {
        "job_title" : posting.job_title,
        "employer" : posting.employer  
      });

  }

  componentWillUnmount() {

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
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
            <Form.Control type="url"></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="postings_date">
            <Form.Label>{t('Posting date')}</Form.Label>
            <Form.Control type="date"></Form.Control>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="deadline_date">
            <Form.Label>{t('Application deadline')}</Form.Label>
            <Form.Control type="date"></Form.Control>
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
              <Form.Control type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="location_city">
              <Form.Label>{t('City')}</Form.Label>
              <Form.Control type="text"></Form.Control>
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
              <Form.Control type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contact_job_title">
              <Form.Label>{t('Job title')}</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contact_details">
              <Form.Label>{t('Details')}</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
          </Col>

        </Form.Row>
      </fieldset>
      <Form.Row>
          <Col>
            <Form.Group controlId="content_raw">
              <Form.Label>{t('Raw text content')}</Form.Label>
              <Form.Control as="textarea" rows={2} />
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
  return {
    obj: selectPosting(root_reducer, +ownProps.match.params.id )
  };
}

function selectPosting( root_reducer, posting_id ) {

  let postings = root_reducer.posting.postings;
  let posting = postings.filter( function( posting ) { return posting.id === posting_id })[0];
  
  return {
    posting: posting
  }
}


export default connect(mapStateToProps)(withTranslation()(PostingsCreate));