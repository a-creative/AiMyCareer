import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import PostingListItem from './PostingsListItem.jsx'
import { connect } from 'react-redux'
import { fetchPostings } from "posting/_store/act.posting";
import { withTranslation } from 'react-i18next';
import moment from 'moment-timezone'

class PostingsList extends React.Component {

  componentDidMount() {

    if ( !this.props.loaded ) {
      this.props.fetchPostings( {
        loggedIn: this.props.loggedIn
      });
    }

  }

  sortPostingsAccToEarliestFeedbackDate = ( a, b ) => {

    // Sort according to feedback status
    let feedbackA = (a.earliestFeedbackDate ? 1 : 0 );
    let feedbackB = (b.earliestFeedbackDate ? 1 : 0 );
    let feedbackDiff = feedbackB - feedbackA;

    if ( feedbackDiff === 0 ) {

      // If both postings have the same feedback status

      if ( feedbackA ) {

        // If the feedback status is: Has feedback date

        // Sort according to feedback date diff
        let feedbackDateA = moment.tz( a.earliestFeedbackDate.date, a.earliestFeedbackDate.timezone ).unix();
        let feedbackDateB = moment.tz( b.earliestFeedbackDate.date, b.earliestFeedbackDate.timezone ).unix();
        return feedbackDateA - feedbackDateB

      } else {

        // If the feedback status is: has NO feedback date

        // Sort according to starting date status
        let startingA = (a.earliestStartingDate ? 1 : 0 );
        let startingB = (b.earliestStartingDate ? 1 : 0 );
        let startingDiff = startingB - startingA;
        if ( startingDiff === 0 ) {

          // If both postings have the same starting date status

          if ( startingA ) {

            // If the starting date status is: Has starting date

            // Sort according to starting date diff
            let startingDateA = moment.tz( a.earliestStartingDate.date, a.earliestStartingDate.timezone ).unix();
            let startingDateB = moment.tz( b.earliestStartingDate.date, b.earliestStartingDate.timezone ).unix();
            return startingDateA - startingDateB
            
          } else {

            // If the starting date status is: Has NO starting date

            // Sort according to posted date
            let postedDateA = moment.tz( a.postedDate.date, a.postedDate.timezone ).unix();
            let postedDateB = moment.tz( b.postedDate.date, b.postedDate.timezone ).unix();
            return postedDateA - postedDateB

          }

        } else {

          return startingDiff;
        }

      }

    } else {
        return feedbackDiff;
    }

  }

  sortPostings = ( a, b) => {

    let appliedA = (a.appliedDate ? 1 : 0 );
    let appliedB = (b.appliedDate ? 1 : 0 );
    let appliedDiff = appliedA - appliedB;

    if ( appliedDiff === 0 ) {

      // If both postings have the same apply status

      if ( appliedA ) {

          // If the apply status is: Applied

          return this.sortPostingsAccToEarliestFeedbackDate( a, b );

      } else {

          // If the apply status is: NOT applied

          // Sort according to deadline status
          let deadlineA = (a.deadlineDate ? 1 : 0 );
          let deadlineB = (b.deadlineDate ? 1 : 0 );
          let deadlineDiff = deadlineB - deadlineA;

          if ( deadlineDiff === 0 ) {

            // If both postings have the same deadline status
            if ( deadlineA ) {

              // If the deadline status is: Has deadline
              let deadlineDateA = moment.tz( a.deadlineDate.date, a.deadlineDate.timezone ).unix();
              let deadlineDateB = moment.tz( b.deadlineDate.date, b.deadlineDate.timezone ).unix();
              let deadlineDateDiff = deadlineDateA - deadlineDateB;
              return deadlineDateDiff

            } else {

              // If the deadline status is: has NO deadline

              return this.sortPostingsAccToEarliestFeedbackDate( a, b ); 

            }

          } else {
              return deadlineDiff;
          }

      }

    } else {

      return appliedDiff;
    }

  }

  render() {

    const { t } = this.props;

    let postings = Array.from(this.props.postings).sort( this.sortPostings );

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
                  key={posting.id.toString()}
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
  error: state.posting.error,
  loggedIn : state.auth.loggedIn,
  loaded : state.posting.loaded,
});

const mapDispatchToProps = {
  fetchPostings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PostingsList));