import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchSkills } from "skill/_store/act.skill";


class SkillCreate extends React.Component {

    constructor( props ) {
        super(props);

        this.state = { ...props };

    }

    componentDidMount() {
        console.log(this.props.loaded)
        if ( !this.props.loaded ) {
            
            this.props.fetchSkills( {
                loggedIn: this.props.loggedIn
            })
        }

    }

    handleInputChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });

        this.props.handleUpdate(e.target.name, e.target.value);
    }

    handleSelectChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    }

    render() {

        const { t } = this.props;

        return <Form.Group>
        <Row>
            <Col md="2">
                <Form.Control placeholder={t('Weight')} type="number" name="usageWeightPct" value={this.state.usageWeightPct || ''} onChange={this.handleInputChange}></Form.Control>
            </Col>
            <Col>
                <Form.Control as="select" name="id" value={this.state.id} onChange={this.handleSelectChange}>
                    <option key={-1}>- {t('Select a skill')}</option>
                    {this.props.skills.map( ( skill ) =>(
                        <option key={skill.id} value={skill.id} style={ { textTransform: ( skill.fixedCase ? 'none' : 'capitalize' ) } }>{ skill.name }</option>
                    ))}
                </Form.Control>
            </Col>
            <Col md="auto">
                <Button onClick={this.props.handleRemove}>-</Button>
            </Col>
        </Row>
      </Form.Group>

    }

}

function mapStateToProps(rootReducer, ownProps) {

    return { 
        skills: rootReducer.skill.skills,  
        loaded : rootReducer.skill.loaded,

        loggedIn : rootReducer.auth.loggedIn,
    };

}

const mapDispatchToProps = {
    fetchSkills
  };
   

export default connect(
    mapStateToProps,  
    mapDispatchToProps
  )(withTranslation()(SkillCreate));