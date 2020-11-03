import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class TaskCreate extends React.Component {

    constructor( props ) {
        super(props);

        this.state = { ...props };

    }

    handleInputChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });

        this.props.handleUpdate(e.target.name, e.target.value);
    }

    render() {

        const { t } = this.props;

        return <Form.Group><Row>
        <Col md="2">
            <Form.Control placeholder={t('Weight')} type="number" name="weightPct" value={this.state.weightPct || ''} onChange={this.handleInputChange}></Form.Control>
        </Col>
        <Col>
            <Form.Control placeholder={t('Description')} type="text" name="description" value={this.state.description || ''} onChange={this.handleInputChange}></Form.Control>
        </Col>
        <Col md="auto">{this.state.myKey}
            <Button onClick={this.props.handleRemove}>-</Button>
        </Col>
        
      </Row></Form.Group>

    }

}

const mapDispatchToProps = {
};

export default connect(
    null,
    mapDispatchToProps
  )(withTranslation()(TaskCreate));