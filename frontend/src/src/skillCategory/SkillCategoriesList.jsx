import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import SkillCategoriesListItem from './SkillCategoriesListItem'
import { connect } from 'react-redux'
import { fetchSkillCategories } from "skillCategory/_store/act.skillCategory";
import { withTranslation } from 'react-i18next';

class SkillCategoriesList extends React.Component {

  componentDidMount() {

    if ( !this.props.loaded ) {
      this.props.fetchSkillCategories( {
        loggedIn: this.props.loggedIn
      });
    }

  }

  render() {

    const { t } = this.props;

    let skillCategories = Array.from(this.props.skillCategories);

    return <Row>
        <Col>
          <Table size="sm">
            <thead>
              <tr>
                <th>{t('Name')}</th>
                <th>{t('Functions')}</th>
              </tr>
            </thead>
            <tbody>
              {skillCategories.map(skillCategory => (
                <SkillCategoriesListItem 
                  key={skillCategory.id.toString()}
                  id={skillCategory.id}
                  name={skillCategory.name}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>;

  }

}

const mapStateToProps = state => ({
  skillCategories: state.skillCategory.skillCategories,
  loggedIn : state.auth.loggedIn,
  loaded : state.skillCategory.loaded,
});

const mapDispatchToProps = {
  fetchSkillCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SkillCategoriesList));