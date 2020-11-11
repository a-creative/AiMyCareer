import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { insertSkillCategory, updateSkillCategory } from "skillCategory/_store/act.skillCategory";
import { fetchSkillCategories } from "skillCategory/_store/act.skillCategory";
import { withRouter  } from "react-router-dom";

class SkillCategoriesCreate extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      fields : {
        id : props.skillCategory.id || -1,
        name : props.skillCategory.name || '',
        icon : props.skillCategory.icon || '',
        foregroundColorHex : props.skillCategory.foregroundColorHex || '',
        backgroundColorHex : props.skillCategory.backgroundColorHex || ''
      }  
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

      this.props.updateSkillCategory( this.state.fields, this.props.loggedIn, () => {
        this.props.history.push('/skill-categories');
      });

    } else {
      
      this.props.insertSkillCategory( this.state.fields, this.props.loggedIn, () => {
        this.props.history.push('/skill-categories'); 
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
            <Form.Group controlId="iconField">
              <Form.Label>{t('Icon')}</Form.Label>
              <Form.Control type="text" name="icon" value={this.state.fields.icon} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="foregroundColorHexField">
              <Form.Label>{t('Foreground color (hex)')}</Form.Label>
              <Form.Control type="text" name="foregroundColorHex" value={this.state.fields.foregroundColorHex} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="backgroundColorHexField">
              <Form.Label>{t('Background color (hex)')}</Form.Label>
              <Form.Control type="text" name="backgroundColorHex" value={this.state.fields.backgroundColorHex} onChange={this.handleInputChange}></Form.Control>
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

function selectSkillCategory( rootReducer, skillCategoryId ) {

  let skillCategories = rootReducer.skillCategory.skillCategories;
  let skillCategory = skillCategories.filter( function( skillCategory ) { return skillCategory.id === skillCategoryId })[0];

  return skillCategory;
}


function mapStateToProps(rootReducer, ownProps) {

  let props = {
      loggedIn : rootReducer.auth.loggedIn
  }

  if ( ownProps.match.params.id ) {
    props.skillCategory = selectSkillCategory(rootReducer, +ownProps.match.params.id )
  } else {
    props.skillCategory = {
      id : -1,
      name : '',
      icon : '',
      foregroundColorHex : '',
      backgroundColorHex : '',
    }
  }

  return props;
}

const mapDispatchToProps = {
  updateSkillCategory,
  insertSkillCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(SkillCategoriesCreate)));