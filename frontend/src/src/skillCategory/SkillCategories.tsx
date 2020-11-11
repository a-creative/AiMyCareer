import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import SkillCategoriesList from './SkillCategoriesList';
import { withRouter  } from "react-router-dom";

function SkillCategories(){

  const { t } = useTranslation();

  return <Row>
  <Col>
    <Row className="mb-3">
      <Col >
        <Button as={Link} to="/skill-categories/create">{t('Opret')}</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <SkillCategoriesList />
      </Col>
    </Row>
  </Col>
</Row>;
}

export default withRouter(SkillCategories);