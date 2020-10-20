import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import PostingListItem from './PostingsListItem.jsx'
import { connect } from 'react-redux'
import { fetchPostings } from "store/actionCreators";
import { withTranslation } from 'react-i18next';

class PostingsList extends React.Component {

  render() {

    const { t } = this.props;

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
                  jobTitle={posting.jobTitle}
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