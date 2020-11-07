import React from 'react';
import { withTranslation } from 'react-i18next'
import { Modal, Button } from '_shared/react-bootstrap'
import { acknowledgeAllErrors } from 'error/_store/act.error';
import { connect } from 'react-redux'

class ErrorMessage extends React.Component {


    handleClose = () => {
        this.props.acknowledgeAllErrors();
    }

    render() {
        const { t, messages } = this.props;

        let message = messages.join(<br />);

        return <Modal
            show={(messages.length > 0)}
            backdrop="static"
            centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Fejl!</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
      
        <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>{t('Close')}</Button>
        </Modal.Footer>
      </Modal>;
        
    }
    
}

const mapStateToProps = state => ({
    messages: state.error.messages,
});

const mapDispatchToProps = {
    acknowledgeAllErrors
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(ErrorMessage));
