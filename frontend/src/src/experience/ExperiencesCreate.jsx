import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap'
import TaskCreate from './TaskCreate';
import { connect } from 'react-redux'
import { formatNormalizedDate } from '_shared/helpers.js';
import { insertExperience, updateExperience, resetExperience, experienceLoaded, experienceLoading } from "experience/_store/act.experience";
import { withRouter  } from "react-router-dom";
import Api from 'experience/_store/api.experience';

class ExperiencesCreate extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      experience : {
        ...{ nextTaskKey: 0 },
        ...props.experience
      },
    }

    this.initExperience = {
      ...this.state.experience
    }

    this.state.experience.endedDate = formatNormalizedDate(this.state.experience.endedDate, 'YYYY-MM-DD');
    this.state.experience.startedDate = formatNormalizedDate(this.state.experience.startedDate, 'YYYY-MM-DD');
    
    this.state.experience.tasksLoaded = true;
    if (!this.state.experience.tasks) {

      this.state.experience.tasksLoaded = false;
    }

  }
  
  handleInputChange = ( event ) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ 
        experience : {
          ...this.state.experience,
          [name]: value
        }
    });

  }

  handleSubmit = ( event ) => {
    event.preventDefault();

    if ( this.props.match.params.id ) {

      this.props.updateExperience( this.state.experience, this.props.loggedIn, () => {
        this.props.history.push('/experiences');
      });

    } else {
      
      this.props.insertExperience( this.state.experience, this.props.loggedIn, () => {
        this.props.history.push('/experiences'); 
      });

    }

    return  false;
  }


  handleAddTask = ( e ) => {
    let state = { ...this.state };
    state.experience.tasks.push({
      key : state.experience.nextTaskKey
    })
    state.experience.nextTaskKey++;
    this.setState(state);
  }

  handleRemoveTask = ( removeTask ) => {

    let updatedTasks = [];

    this.state.experience.tasks.forEach( ( task ) => {
      if ( task.key !== removeTask.key ) {
        updatedTasks.push( task )
      } 
    });

    let state = { ...this.state };
    state.experience.tasks = updatedTasks;
    this.setState(state);

  }

  handleUpdateTask = ( updateTask, key, value ) => {

    let i = this.state.experience.tasks.findIndex( ( task ) => { return task.key === updateTask.key });

    if ( typeof i !== 'undefined') {
      let state = { ...this.state };
      state.experience.tasks[ i ][ key ] = value;
      this.setState(state);
    }

  }

  componentDidMount() {

    if ( this.props.match.params.id ) {

      if (!this.state.experience.tasksLoaded) {

        this.props.experienceLoading();
        Api.getExperience( this.state.experience, this.props.loggedIn )
          .then(response => response.json())
          .then(
              data => {

                let state = { ...this.state };
                
                state.experience.tasksLoaded = true;
                state.experience.tasks = data.tasks
                  .sort( (taskA,taskB) => { return taskA.weightPct > taskB.weightPct })
                  .map(( task, key ) => {
                    task.key = key
                    return task;
                  });
                state.experience.nextTaskKey = data.tasks.length;              

                this.initExperience = { ...this.state.experience };

                this.setState(state);  
                this.props.experienceLoaded();
              },
              error => this.props.experienceHandleError( error )
          )
      }
    } else {
        let state = { ...this.state };
        state.experience.tasksLoaded = true;
        state.experience.tasks = [];
        this.setState(state);  
    }
  } 

  handleCancel = () => {
    
    this.props.resetExperience(this.state.experience.id, this.initExperience, () => {
      this.props.history.goBack();
    } )

  }

  render() {

    const { t } = this.props;

    return <Row>
    <Col>
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group controlId="employerField">
              <Form.Label>{t('Employer')}</Form.Label>
              <Form.Control type="text" name="employer" value={this.state.experience.employer || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="jobTitleField">
              <Form.Label>{t('Job title')}</Form.Label>
              <Form.Control type="text" name="jobTitle" value={this.state.experience.jobTitle || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="startedDateField">
              <Form.Label>{t('Experience date')}</Form.Label>
              <Form.Control type="date" name="startedDate" value={this.state.experience.startedDate || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="endedDateField">
              <Form.Label>{t('Application deadline')}</Form.Label>
              <Form.Control type="date" name="endedDate" value={this.state.experience.endedDate || ''} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <fieldset>
          <Form.Label as="legend">
            {t('Tasks')} <Button onClick={this.handleAddTask}>+</Button>
          </Form.Label> 
          <Form.Row>
            <Col>
              { this.state.experience.tasksLoaded && 
                (
                  this.state.experience.tasks.length > 0 ?
                    ( this.state.experience.tasks.map((task) => (
                    <TaskCreate 
                      key={task.key} 
                      weightPct={task.weightPct} 
                      description={task.description} 
                      handleRemove={() => this.handleRemoveTask( task ) }
                      handleUpdate={( key, value ) => this.handleUpdateTask( task, key, value ) }
                    />
                    )))
                  : <p>{t('No tasks.')}</p>
                )
              }
            </Col>
          </Form.Row>
        </fieldset>
        <Form.Row>
          <Col>
            <Button variant="primary" type="submit">{t('Save')}</Button>
            { ' ' }
            <Button onClick={this.handleCancel} variant="light">{t('Cancel')}</Button>
          </Col>
        </Form.Row>
      </Form>
    </Col>
  </Row>;

  }

}

function selectExperience( rootReducer, experienceId ) {

  let experiences = rootReducer.experience.experiences;
  let experience = experiences.filter( function( experience ) { return experience.id === experienceId })[0];

  return experience;
}

function mapStateToProps(rootReducer, ownProps) {

  let r = {
      loggedIn : rootReducer.auth.loggedIn
  }

  if ( ownProps.match.params.id ) {
    r.experience = selectExperience(rootReducer, +ownProps.match.params.id );
  } else {
    r.experience = {}
  }  

  return r;
}

const mapDispatchToProps = {
  updateExperience,
  insertExperience,
  resetExperience,
  experienceLoaded,
  experienceLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(ExperiencesCreate)));