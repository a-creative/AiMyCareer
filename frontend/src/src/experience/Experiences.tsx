import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import ExperiencesList from './ExperiencesList.jsx';
import { withRouter  } from "react-router-dom";

function Experiences(){

  const { t } = useTranslation();

  return <Row>
  <Col>
    <Row className="mb-3">
      <Col >
        <Button as={Link} to="/experiences/create">{t('Opret')}</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <ExperiencesList />
      </Col>
    </Row>
  </Col>
</Row>;
}

export default withRouter(Experiences);