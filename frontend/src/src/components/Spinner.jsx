import React from 'react';
import { Row, Col} from 'react-bootstrap'
import SpinnerBootstrap from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

function Spinner( props ) {

    const { t } = useTranslation();

    return <Row><Col><SpinnerBootstrap animation="border" role="status">
    <span className="sr-only">{t('Loading...')}</span>
  </SpinnerBootstrap></Col></Row>;

}

export default Spinner;