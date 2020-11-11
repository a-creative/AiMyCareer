import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import SkillCreate from './SkillCreate'

class TaskCreate extends React.Component {

    constructor( props ) {
        super(props);

        this.state = { 
            fields : {
                weightPct : props.weightPct || '',
                description : props.description || '',
                usedSkills: props.usedSkills || [],
            }
        };

    }

    handleInputChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });

        this.props.handleUpdate(e.target.name, e.target.value);
    }

    componentDidUpdate(prevProps) {

        Object.keys(this.state.fields).forEach( ( fieldName ) => {
            if(prevProps[ fieldName ] !== this.props[ fieldName ]) {
                let updateState = { ...this.state }
                updateState.fields[ fieldName ] = this.props[ fieldName ];
                this.setState( updateState )
            }
        });

    }

    render() {

        const { t } = this.props;

        return <Form.Group>
        <Row>
            <Col md="2">
                <Form.Control placeholder={t('Weight')} type="number" name="weightPct" value={this.state.fields.weightPct} onChange={this.handleInputChange}></Form.Control>
            </Col>
            <Col>
                <Form.Control placeholder={t('Description')} type="text" name="description" value={this.state.fields.description} onChange={this.handleInputChange}></Form.Control>
            </Col>
            <Col md="auto">
                <Button onClick={this.props.handleRemove}>-</Button>
            </Col>
        </Row>
        <Row>
            <Col md="2" className="text-right">
                <Button onClick={this.props.handleAddSkill}>+</Button>
            </Col>
            <Col md="6">
                { 
                    this.state.fields.usedSkills.length > 0 ?
                        this.state.fields.usedSkills.map( ( usedSkill ) => (
                        <SkillCreate 
                            key={usedSkill.key} 
                            id={usedSkill.id} 
                            usageWeightPct={usedSkill.usageWeightPct} 
                            handleRemove={() => this.props.handleRemoveSkill( usedSkill ) }
                            handleUpdate={( key, value ) => this.props.handleUpdateSkill( usedSkill, key, value ) }
                        />
                        ) ) 
                    : <p>{t('This task has no skills attached yet.')}</p>
                }
            </Col>
        </Row>
        
      </Form.Group>

    }

}


export default withTranslation()(TaskCreate);