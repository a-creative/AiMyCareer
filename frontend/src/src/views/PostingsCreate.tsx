import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/reducers";
import { useParams } from 'react-router-dom';

interface ParamTypes {
  id: string
}

function PostingsCreate(){
  let { id } = useParams<ParamTypes>();

  var id_val : number = +id;

  const { t } = useTranslation();

  return <Row>
  <Helmet>
    <title>{t('Create job posting')} - {t('Job Finder')}</title>
  </Helmet>
  <Col>
    <PageHeader title={t('Create job posting')} />
    <Form>
    <Form.Row>
      <Col>
        <Form.Group controlId="job_title">
          <Form.Label>{t('Job title')}</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="employer">
          <Form.Label>{t('Employer')}</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="ext_link">
          <Form.Label>{t('Link')}</Form.Label>
          <Form.Control type="url"></Form.Control>
        </Form.Group>
      </Col>
    </Form.Row>
    <Form.Row>
      <Col>
        <Form.Group controlId="postings_date">
          <Form.Label>{t('Posting date')}</Form.Label>
          <Form.Control type="date"></Form.Control>
        </Form.Group>
      </Col>
      <Col>
      <Form.Group controlId="deadline_date">
          <Form.Label>{t('Application deadline')}</Form.Label>
          <Form.Control type="date"></Form.Control>
        </Form.Group>
      </Col>
    </Form.Row>
    <fieldset>
      <Form.Label as="legend">
        {t('Work location')}
      </Form.Label>
      <Form.Row>
        <Col lg="2">
          <Form.Group controlId="location_postal_code">
            <Form.Label>{t('Postal code')}</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="location_city">
            <Form.Label>{t('City')}</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
    </fieldset>
    <fieldset>
      <Form.Label as="legend">
        Contact info
      </Form.Label>
      <Form.Row>
        <Col>
          <Form.Group controlId="contact_name">
            <Form.Label>{t('Name')}</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="contact_job_title">
            <Form.Label>{t('Job title')}</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="contact_details">
            <Form.Label>{t('Details')}</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
        </Col>

      </Form.Row>
    </fieldset>
    <Form.Row>
        <Col>
          <Form.Group controlId="content_raw">
            <Form.Label>{t('Raw text content')}</Form.Label>
            <Form.Control as="textarea" rows={2} />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Button variant="primary" type="submit">{t('Save')}</Button>
        </Col>
      </Form.Row>
    </Form>
  </Col>
</Row>;
}

export default PostingsCreate;