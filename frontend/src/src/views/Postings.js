import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader.js';
import { Row, Col, Table } from 'react-bootstrap'

function PostingsList(){

  const [postings] = useState([
    {
      id : 1,
      position : 'Web udvikler',
      employer : 'Datagraf AS'
    },
    {
      id : 2,
      position : 'Programmør',
      employer : 'Webbureauet Infoserv'
    }
  ]);

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