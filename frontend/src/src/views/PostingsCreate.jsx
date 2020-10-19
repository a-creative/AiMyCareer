import React from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from 'components/PageHeader';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { formatNormalizedDate } from 'helpers';
import { insertPosting, updatePosting } from "store/action_creators";


class PostingsCreate extends React.Component {

  constructor(props) {

    super(props);

    let page_title_t = ( typeof this.props.match === 'undefined' ? 'Create job posting' : 'Edit job posting' )
    let init_posting = {
      ...{
        
      },
      ...props.obj.posting
    }

    this.state = {
      posting : init_posting,
      ...{ page_title_t }
    }

    this.state.posting.deadline_date = formatNormalizedDate(init_posting.deadline_date, 'YYYY-MM-DD');
    this.state.posting.posted_date = formatNormalizedDate(init_posting.posted_date, 'YYYY-MM-DD');

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
      <title>{t(this.state.page_title_t)} - {t('Job Finder')}</title>
    </Helmet>
    <Col>
      <PageHeader title={t(this.state.page_title_t)} />
      <Form onSubmit={this.handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Group controlId="employer">
            <Form.Label>{t('Employer')}</Form.Label>
            <Form.Control type="text" name="employer" value={this.state.posting.employer || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="job_title">
            <Form.Label>{t('Job title')}</Form.Label>
            <Form.Control type="text" name="job_title" value={this.state.posting.job_title || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="ext_link">
            <Form.Label>{t('Link')}</Form.Label>
            <Form.Control type="url" name="ext_link" value={this.state.posting.ext_link || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="posted_date">
            <Form.Label>{t('Posting date')}</Form.Label>
            <Form.Control type="date" name="posted_date" value={this.state.posting.posted_date || ''} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="deadline_date">
            <Form.Label>{t('Application deadline')}</Form.Label>
            <Form.Control type="date" name="deadline_date" value={this.state.posting.deadline_date || ''} onChange={this.handleInputChange}></Form.Control>
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
              <Form.Control type="text" name="location_postal_code" value={this.state.posting.location_postal_code || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="location_city">
              <Form.Label>{t('City')}</Form.Label>
              <Form.Control type="text" name="location_city" value={this.state.posting.location_city || ''} onChange={this.handleInputChange}></Form.Control>
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
              <Form.Control type="text" name="contact_name" value={this.state.posting.contact_name || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contact_job_title">
              <Form.Label>{t('Job title')}</Form.Label>
              <Form.Control type="text" name="contact_job_title" value={this.state.posting.contact_job_title || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contact_details">
              <Form.Label>{t('Details')}</Form.Label>
              <Form.Control type="text" name="contact_details" value={this.state.posting.contact_details || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>

        </Form.Row>
      </fieldset>
      <Form.Row>
          <Col>
            <Form.Group controlId="content_raw">
              <Form.Label>{t('Raw text content')}</Form.Label>
              <Form.Control as="textarea" rows={2} name="content_raw" value={this.state.posting.content_raw || ''} onChange={this.handleInputChange}/>
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

const mapDispatchToProps = {
  updatePosting,
  insertPosting
};

function selectPosting( root_reducer, posting_id ) {

  let postings = root_reducer.posting.postings;
  let posting = postings.filter( function( posting ) { return posting.id === posting_id })[0];

  return {
    posting: posting
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PostingsCreate));