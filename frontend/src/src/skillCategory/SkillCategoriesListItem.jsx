import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { deleteSkillCategory } from "skillCategory/_store/act.skillCategory";
import { getAwesomeIconFromString } from '_shared/helpers'

class SkillCategoriesListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields : {
        id : props.skillCategory.id,
        name : props.skillCategory.name || '',
        icon : props.skillCategory.icon || '',
        foregroundColorHex : props.skillCategory.foregroundColorHex || '',
        backgroundColorHex : props.skillCategory.backgroundColorHex || '',
      }
    }

  }

  handleClickDelete = ( e ) => {

    const { t } = this.props;

    e.preventDefault();
    if (window.confirm( t('Do you really want to delete {{objectTypeName}}?', { objectTypeName : t('this skill category')}))) {
      this.props.deleteSkillCategory( this.props.skillCategory, this.props.loggedIn );
    }

  }

  componentDidUpdate(prevProps) {
    Object.keys(this.state.fields).forEach( ( fieldName ) => {
        if(prevProps[ fieldName ] !== this.props[ fieldName ]) {
            let updateState = { ...this.state }
            updateState.fields[ fieldName ] = this.props[ fieldName ];
            this.setState( updateState )
        }
    });
  }

  render() {

    const { t } = this.props;

    return <tr>
    <td>{ getAwesomeIconFromString(
      this.state.fields.name, 
      this.state.fields.icon, 
      this.state.fields.foregroundColorHex, 
      this.state.fields.backgroundColorHex
      ) 
    }</td>
    <td>
      <ButtonGroup aria-label={t('Functions')}>
        <Button as={Link} to={`/skill-categories/edit/${this.state.fields.id}`} size="sm">{t('Edit')}</Button>
        <Button onClick={this.handleClickDelete} size="sm">{t('Delete')}?</Button>
      </ButtonGroup>
    </td>
  </tr>;

  }
  
}

function selectSkillCategory( rootReducer, skillCategoryId ) {

  let skillCategories = rootReducer.skillCategory.skillCategories;
  let skillCategory = skillCategories.filter( function( skillCategory ) { return skillCategory.id === skillCategoryId })[0];
  return skillCategory;
}

function mapStateToProps(rootReducer, ownProps) {
  return { 
    loggedIn: rootReducer.auth.loggedIn, 
    skillCategory :selectSkillCategory(rootReducer, +ownProps.id ) 
  };
}


const mapDispatchToProps = {
  deleteSkillCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SkillCategoriesListItem));