import React from 'react';
import PageHeader from './PageHeader';
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { withRouter  } from "react-router-dom";

class Page extends React.Component {

    componentDidMount() {

        if ( ( this.props.location !== '/login') && (!this.props.loggedIn) && (!localStorage.getItem('token')) ) {
            this.props.history.push('/login');
        }
        
    }

    render() {

        return <Row>
                <Col>
                    <PageHeader title={this.props.title} />
                    {this.props.children}
                </Col>
            </Row>;

    }

}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
  });
  
export default connect(
    mapStateToProps,
    null
)(withRouter(Page));