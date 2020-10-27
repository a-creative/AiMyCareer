import React from 'react';
import { logout } from "store/actionCreators";
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next';
import { Row, Col, Nav, Navbar } from 'components/react-bootstrap'
import { withRouter  } from "react-router-dom";



class PageFooter extends React.Component {

    handleLogout = ( e ) => {
        e.preventDefault();

        this.props.logout( this.props.loggedIn, () => {
            this.props.history.push('/');
        } );

    }

    render() {

        const { t } = this.props;
        
        return <Row>
        <Col>
            {
            this.props.loggedIn &&
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {t('Current user:')} {this.props.loggedIn.firstName} {this.props.loggedIn.lastName} / {this.props.loggedIn.email}
                    </Navbar.Text>
                    <Navbar.Text>
                        <Nav.Link onClick={this.handleLogout}>{t('Logout')}</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            }
        </Col>
        </Row>;

    }

}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});


const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(PageFooter)));