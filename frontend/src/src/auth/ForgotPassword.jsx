import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from 'app/PageHeader';
import { Row, Col } from 'react-bootstrap'

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