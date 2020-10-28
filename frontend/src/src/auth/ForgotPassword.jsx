import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap'
import { withRouter  } from "react-router-dom";

function ForgotPassword(){

  const { t } = useTranslation();

  return <Row>
    <Col>
        <Row className="mb-3">
            <Col sm="3">
                
            </Col>
        </Row>
    </Col>
</Row>;
}

export default withRouter(ForgotPassword);