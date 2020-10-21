import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { deletePosting } from "store/actionCreators";

class PostingsListItem extends React.Component {

  constructor(props) {

    super(props);

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickArchive = this.handleClickArchive.bind(this);

  }

  handleClickDelete( e ) {

    const { t } = this.props;

    e.preventDefault();
    if (window.confirm( t('Do you really want to delete this job posting?'))) {
      this.props.deletePosting( this.props );
    }

    return false;
  }

  handleClickArchive( e ) {
    e.preventDefault();

    alert('Archive not yet implemented');

    return false;
  }

  render() {

    const { t } = this.props;

    return <tr>
    <td>{this.props.employer}</td>
    <td>{this.props.jobTitle}</td>
    <td>
      <ButtonGroup aria-label={t('Functions')}>
        <Button as={Link} to={`/postings/edit/${this.props.id}`} size="sm">{t('Edit')}</Button>
        <Button onClick={this.handleClickArchive} size="sm">{t('Archive')}</Button>
        <Button onClick={this.handleClickDelete} size="sm">{t('Delete')}?</Button>
      </ButtonGroup>
    </td>
  </tr>;

  }
  
}


function selectPosting( rootReducer, postingId ) {

  let postings = rootReducer.posting.postings;
  let posting = postings.filter( function( posting ) { return posting.id === postingId })[0];
  return posting;
}

function mapStateToProps(rootReducer, ownProps) {
  return { ...selectPosting(rootReducer, +ownProps.id ) };
}


const mapDispatchToProps = {
  deletePosting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PostingsListItem));