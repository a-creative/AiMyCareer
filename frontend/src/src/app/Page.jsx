import React from 'react';
import PageHeader from './PageHeader';
import { Row, Col } from 'react-bootstrap'


class Page extends React.Component {

    render() {

        return <Row>
                <Col>
                    <PageHeader title={this.props.title} />
                    {this.props.children}
                </Col>
            </Row>;

    }

}

export default Page;