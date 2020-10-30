import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import ExperienceListItem from './ExperiencesListItem.jsx'
import { connect } from 'react-redux'
import { fetchExperiences } from "experience/_store/act.experience";
import { withTranslation } from 'react-i18next';

class ExperiencesList extends React.Component {

  componentDidMount() {

    if ( !this.props.loaded ) {
      this.props.fetchExperiences( {
        loggedIn: this.props.loggedIn
      });
    }

  }

  render() {

    const { t } = this.props;

    let experiences = Array.from(this.props.experiences);

    return <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>{t('Period')}</th>
                <th>{t('Employer')}</th>
                <th>{t('Job title')}</th>
                <th>{t('Functions')}</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map(experience => (
                <ExperienceListItem 
                  key={experience.id.toString()}
                  id={experience.id}
                  employer={experience.employer}
                  jobTitle={experience.jobTitle}
                  startedDate={experience.startedDate}
                  endedDate={experience.endedDate}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>;

  }

}

const mapStateToProps = state => ({
  experiences: state.experience.experiences,
  loading: state.experience.loading,
  error: state.experience.error,
  loggedIn : state.auth.loggedIn,
  loaded : state.experience.loaded,
});

const mapDispatchToProps = {
  fetchExperiences
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ExperiencesList));