import React from 'react';
import { Row, Col } from 'react-bootstrap'

interface PageHeaderProps {
    title : string
}


function PageHeader( props : PageHeaderProps) {
    const { title } = props;
 
    return <Row><Col><h1>{title}</h1></Col></Row>;
}

export default PageHeader;