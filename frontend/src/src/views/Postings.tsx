import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import { Row, Col, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';

function PostingsList(){

  const { t } = useTranslation();

  const postings : readonly IPosting[] = useSelector( ( state : PostingState ) => state.postings );
  if (typeof postings == 'undefined') alert('FAIL');

  return <Row>
    <Col>
      <Table>
        <thead>
          <tr>
            <th>{t('Job title')}</th>
            <th>{t('Employer')}</th>
          </tr>
        </thead>
        <tbody>
          {postings.map(posting => (
            <tr key={posting.id}>
                <td>{posting.position}</td>
                <td>{posting.employer}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
}

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