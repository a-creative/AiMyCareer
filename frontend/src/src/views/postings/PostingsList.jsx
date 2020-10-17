import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import PostingListItem from './PostingsListItem'
import { connect } from 'react-redux'
import {loadPostings} from "../../store/actions";
import { withTranslation } from 'react-i18next';



class PostingsList extends React.Component {

  componentDidMount() {
    this.props.loadPostings();
  }

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
  loadPostings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PostingsList));