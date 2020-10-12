import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import { Row, Col } from 'react-bootstrap'
import PostingsList from './postings/PostingsList';

function Postings(){

  const { t } = useTranslation();

  return <Row>
  <Helmet>
    <title>{t('Postings')} - {t('Job Finder')}</title>
  </Helmet>
  <Col>
    <PageHeader title={t('Postings')} />
    <Row>
      <Col>
        <PostingsList />
      </Col>
    </Row>
  </Col>
</Row>;
}

export default Postings;