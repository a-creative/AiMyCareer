import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from 'components/PageHeader';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";

function ForgotPassword(){

  const { t } = useTranslation();

  return <Row>
    <Col>
        <PageHeader title={t('Forgot password')} />
        <Row className="mb-3">
            <Col sm="3">
                
            </Col>
        </Row>
    </Col>
</Row>;
}

export default ForgotPassword;