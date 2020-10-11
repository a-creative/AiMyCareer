import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader.js';
import { Row, Col, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';

function PostingsList(){

  const postings = useSelector( state => state.postings_reducer );

  return <Row>
    <Col>
      <Table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Employer</th>
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

function Postings({t}){
  return <Row>
  <Helmet>
    <title>{t('Postings')} - {t('Job Finder')}</title>
  </Helmet>
  <Col>
    <PageHeader title="Postings" />
    <Row>
      <Col>
        <PostingsList />
      </Col>
    </Row>
  </Col>
</Row>;
}

export default withTranslation()(Postings);