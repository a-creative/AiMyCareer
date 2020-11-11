import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import SkillsList from './SkillsList';
import { withRouter  } from "react-router-dom";
function Skills(){

  const { t } = useTranslation();

  return <Row>
  <Col>
    <Row className="mb-3">
      <Col >
        <Button as={Link} to="/skills/create">{t('Opret')}</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <SkillsList />
      </Col>
    </Row>
  </Col>
</Row>;
}

export default withRouter(Skills);