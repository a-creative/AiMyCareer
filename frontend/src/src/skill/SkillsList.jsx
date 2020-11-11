import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import SkillListItem from './SkillsListItem.jsx'
import { connect } from 'react-redux'
import { fetchSkills } from "skill/_store/act.skill";
import { withTranslation } from 'react-i18next';

class SkillsList extends React.Component {

  componentDidMount() {

    if ( !this.props.loaded ) {
      this.props.fetchSkills( {
        loggedIn: this.props.loggedIn
      });
    }

  }

  render() {

    const { t } = this.props;

    let skills = Array.from(this.props.skills);

    return <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>{t('Name')}</th>
                <th>{t('Functions')}</th>
              </tr>
            </thead>
            <tbody>
              {skills.map(skill => (
                <SkillListItem 
                  key={skill.id.toString()}
                  id={skill.id}
                  name={skill.name}
                  fixedCase={skill.fixedCase}
                  categoryId={skill.categoryId}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>;

  }

}

const mapStateToProps = state => ({
  skills: state.skill.skills,
  loggedIn : state.auth.loggedIn,
  loaded : state.skill.loaded,
});

const mapDispatchToProps = {
  fetchSkills
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SkillsList));