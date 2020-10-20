import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import PostingListItem from './PostingsListItem.jsx'
import { connect } from 'react-redux'
import { fetchPostings } from "store/action_creators";
import { withTranslation } from 'react-i18next';
import Spinner from 'components/Spinner';

class PostingsList extends React.Component {

  componentDidMount() {
    if ( this.props.postings.length === 0 ) {
      this.props.fetchPostings();
    }
  }

  render() {

    const { t } = this.props;

    if(this.props.loading) return <Spinner />;

    let postings = Array.from(this.props.postings);

    return <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>{t('Employer')}</th>
                <th>{t('Job title')}</th>
                <th>{t('Functions')}</th>
              </tr>
            </thead>
            <tbody>
              {postings.map(posting => (
                <PostingListItem 
                  key={posting.id}
                  id={posting.id}
                  employer={posting.employer}
                  job_title={posting.job_title}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>;

  }

}

const mapStateToProps = state => ({
  postings: state.posting.postings,
  loading: state.posting.loading,
  error: state.posting.error
});

const mapDispatchToProps = {
  fetchPostings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PostingsList));