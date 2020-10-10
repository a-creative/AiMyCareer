import React from 'react';
import { withTranslation } from 'react-i18next';
//import { Row, Col } from 'react-bootstrap'

function PageHeader({ t, title }) {

    return <h1>{t(title)}</h1>;
}

export default withTranslation()(PageHeader);