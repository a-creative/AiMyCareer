import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { deleteExperience } from "experience/_store/act.experience";
import { formatNormalizedPeriod } from '_shared/helpers.js';

class ExperiencesListItem extends React.Component {

  constructor (props) {
    super(props);

    const { t } = this.props;

    this.state = {
      period : formatNormalizedPeriod( props.startedDate, props.endedDate, t ),
    }

  }

  handleClickDelete = ( e ) => {

    const { t } = this.props;

    e.preventDefault();
    if (window.confirm( t('Do you really want to delete {{objectTypeName}}?', { objectTypeName : t('this job experience')}))) {
      this.props.deleteExperience( this.props.experience, this.props.loggedIn );
    }

    return false;
  }

  handleClickArchive = ( e ) => {
    e.preventDefault();

    alert('Archive not yet implemented');

    return false;
  }

  render() {

    const { t } = this.props;

    return <tr>
    <td>{this.state.period}</td>
    <td>{this.props.employer}</td>
    <td>{this.props.jobTitle}</td>
    <td>
      <ButtonGroup aria-label={t('Functions')}>
        <Button as={Link} to={`/experiences/edit/${this.props.id}`} size="sm">{t('Edit')}</Button>
        <Button onClick={this.handleClickArchive} size="sm">{t('Archive')}</Button>
        <Button onClick={this.handleClickDelete} size="sm">{t('Delete')}?</Button>
      </ButtonGroup>
    </td>
  </tr>;

  }
  
}


function selectExperience( rootReducer, experienceId ) {

  let experiences = rootReducer.experience.experiences;
  let experience = experiences.filter( function( experience ) { return experience.id === experienceId })[0];
  return experience;
}

function mapStateToProps(rootReducer, ownProps) {
  return { 
    loggedIn: rootReducer.auth.loggedIn, 
    experience : selectExperience(rootReducer, +ownProps.id ) 
  };
}


const mapDispatchToProps = {
  deleteExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ExperiencesListItem));