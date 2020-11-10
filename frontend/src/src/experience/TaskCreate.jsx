import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import SkillCreate from './SkillCreate'

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

        return <Form.Group>
        <Row>
            <Col md="2">
                <Form.Control placeholder={t('Weight')} type="number" name="weightPct" value={this.state.weightPct || ''} onChange={this.handleInputChange}></Form.Control>
            </Col>
            <Col>
                <Form.Control placeholder={t('Description')} type="text" name="description" value={this.state.description || ''} onChange={this.handleInputChange}></Form.Control>
            </Col>
            <Col md="auto">
                <Button onClick={this.props.handleRemove}>-</Button>
            </Col>
        </Row>
        <Row>
            <Col md={ { offset: 2 } }>
                { this.state.usedSkills.map( ( usedSkill ) => (
                <SkillCreate 
                    key={usedSkill.id} 
                    id={usedSkill.id} 
                    usageWeightPct={usedSkill.usageWeightPct} 
                    name={usedSkill.name} />
                ) ) }
            </Col>
        </Row>
        
      </Form.Group>

    }

}


export default withTranslation()(TaskCreate);