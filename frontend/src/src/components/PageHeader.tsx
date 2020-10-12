import React from 'react';
//import { Row, Col } from 'react-bootstrap'

interface PageHeaderProps {
    title : string
}


function PageHeader( props : PageHeaderProps) {
    const { title } = props;
 
    return <h1>{title}</h1>;
}

export default PageHeader;