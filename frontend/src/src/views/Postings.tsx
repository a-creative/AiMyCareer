import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import PageHeader from 'components/PageHeader';
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import PostingsList from './postings/PostingsList.jsx';

function Postings(){

  const { t } = useTranslation();

  return <Row>
  <Helmet>
    <title>{t('Job postings')} - {t('Job Finder')}</title>
  </Helmet>
  <Col>
    <PageHeader title={t('Job postings')} />
    <Row className="mb-3">
      <Col >
        <Button as={Link} to="/postings/create">{t('Opret')}</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <PostingsList />
      </Col>
    </Row>
  </Col>
</Row>;
}

export default Postings;