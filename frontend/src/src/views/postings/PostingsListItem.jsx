import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

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

      alert('Delete not yet implemented');

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

    return <tr key="{this.props.id}">
    <td>{this.props.employer}</td>
    <td>{this.props.job_title}</td>
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

export default withTranslation()(PostingsListItem);