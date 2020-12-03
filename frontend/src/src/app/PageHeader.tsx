import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
    title : string
}

function PageHeader( props : PageHeaderProps) {
    const { title } = props;
    const { t } = useTranslation();
    
    return <Row><Helmet>
    <title>{title} - {t('AiMyCareer')}</title>
</Helmet><Col><h1>{title}</h1></Col></Row>;
}

export default PageHeader;