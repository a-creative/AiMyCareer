import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { insertSkill, updateSkill } from "skill/_store/act.skill";
import { fetchSkillCategories } from "skillCategory/_store/act.skillCategory";
import { withRouter  } from "react-router-dom";
import { VALID_SKILL_TYPES } from "skill/_store/con.skill";

class SkillsCreate extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      fields : {
        id : props.skill.id || -1,
        name : props.skill.name || '',
        fixedCase : ( typeof(props.skill.fixedCase) === 'undefined' ? true : props.skill.fixedCase ),
        type : ( typeof(props.skill.type) === 'undefined' ? -1 : props.skill.type ),
        categoryId : props.skill.categoryId || -1,
        explainer : props.skill.explainer || ''
      }  
    }

  }

  componentDidMount() {
    if ( !this.props.loaded ) {
        this.props.fetchSkillCategories( {
            loggedIn: this.props.loggedIn
        })
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

  handleInputChange = ( event ) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ 
        fields : {
          ...this.state.fields,
          [name]: value
        }
    });

  }

  handleSubmit = ( event ) => {
    event.preventDefault();

    if ( this.props.match.params.id ) {

      this.props.updateSkill( this.state.fields, this.props.loggedIn, () => {
        this.props.history.push('/skills');
      });

    } else {
      
      this.props.insertSkill( this.state.fields, this.props.loggedIn, () => {
        this.props.history.push('/skills'); 
      });

    }

    return  false;
  }


  
  render() {

    const { t } = this.props;

    return <Row>
    <Col>
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group controlId="nameField">
              <Form.Label>{t('Name')}</Form.Label>
              <Form.Control type="text" name="name" value={this.state.fields.name} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="fixedCaseField">
              <Form.Check type="checkbox" name="fixedCase" checked={this.state.fields.fixedCase} label={t('The first letter of the name has a fixed case.')} onChange={this.handleInputChange} />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="typeField">
              <Form.Label>{t('Type') }</Form.Label>
              <Form.Control name="type" as="select" value={this.state.fields.type} onChange={this.handleInputChange}>
                <option key={-1}>- {t('Select {{a_object_name}}', {  a_object_name : t('a type') } )}</option>
                {VALID_SKILL_TYPES.map( ( skill_type_id ) =>(
                    <option key={skill_type_id} value={skill_type_id}>{ t('skill_type_' + skill_type_id ) }</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="categoryField">
              <Form.Label>{t('Category')} : {this.state.fields.categoryId}</Form.Label>
              <Form.Control name="categoryId" as="select" value={this.state.fields.categoryId} onChange={this.handleInputChange}>
                <option key={-1}>- {t('Select {{a_object_name}}', {  a_object_name : t('a category') })}</option>
                {this.props.categories.map( ( category ) =>(
                <option key={category.id} value={category.id}>{ category.name } {category.id}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="explainerField">
              <Form.Label>{t('Description')}</Form.Label>
              <Form.Control as="textarea" name="explainer" value={this.state.fields.explainer || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button variant="primary" type="submit">{t('Save')}</Button>
            { ' ' }
            <Button onClick={ (e) => { this.props.history.goBack();} } variant="light" type="submit">{t('Cancel')}</Button>
          </Col>
        </Form.Row>
      </Form>
    </Col>
  </Row>;

  }

}

function selectSkill( rootReducer, skillId ) {

  let skills = rootReducer.skill.skills;
  let skill = skills.filter( function( skill ) { return skill.id === skillId })[0];

  return skill;
}


function mapStateToProps(rootReducer, ownProps) {

  let props = {
      loggedIn : rootReducer.auth.loggedIn
  }

  if ( ownProps.match.params.id ) {
    props.skill = selectSkill(rootReducer, +ownProps.match.params.id )
  } else {
    props.skill = {
      id: -1,
      name : '',
      fixedCase : 'checked',
      type : -1,
      categoryId : -1,
      explainer : ''
    }
  }

  props.categories = rootReducer.skillCategory.skillCategories;

  return props;
}

const mapDispatchToProps = {
  updateSkill,
  insertSkill,
  fetchSkillCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(SkillsCreate)));