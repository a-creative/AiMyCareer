import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { deleteSkill } from "skill/_store/act.skill";

class SkillsListItem extends React.Component {

  handleClickDelete = ( e ) => {

    const { t } = this.props;

    e.preventDefault();
    if (window.confirm( t('Do you really want to delete {{objectTypeName}}?', { objectTypeName : t('this skill')}))) {
      this.props.deleteSkill( this.props.skill, this.props.loggedIn );
    }

    return false;
  }

  render() {

    const { t } = this.props;

    return <tr>
    <td style={ { textTransform: ( this.props.fixedCase ? 'none' : 'capitalize' ) } }>{this.props.name}</td>
    <td>
      <ButtonGroup aria-label={t('Functions')}>
        <Button as={Link} to={`/skills/edit/${this.props.id}`} size="sm">{t('Edit')}</Button>
        <Button onClick={this.handleClickDelete} size="sm">{t('Delete')}?</Button>
      </ButtonGroup>
    </td>
  </tr>;

  }
  
}


function selectSkill( rootReducer, skillId ) {

  let skills = rootReducer.skill.skills;
  let skill = skills.filter( function( skill ) { return skill.id === skillId })[0];
  return skill;
}

function mapStateToProps(rootReducer, ownProps) {
  return { 
    loggedIn: rootReducer.auth.loggedIn, 
    skill :selectSkill(rootReducer, +ownProps.id ) 
  };
}


const mapDispatchToProps = {
  deleteSkill
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SkillsListItem));