import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";


function PostingsListItem( props : IPosting ) {

  const { t } = useTranslation();

  function handleClickDelete( e : any ) {
    e.preventDefault();
    if (window.confirm( t('Do you really want to delete this job posting?'))) {

      let posting_id: number = props.id;
      alert('Delete not yet implemented');

    }

    return false;
  }

  function handleClickArchive( e : any ) {
    e.preventDefault();

    let posting_id: number = props.id;
    alert('Archive not yet implemented');

    return false;
  }

  return <tr key="{props.id}">
    <td>{props.employer}</td>
    <td>{props.job_title}</td>
    <td>
      <ButtonGroup aria-label="{t('Functions')}">
        <Button as={Link} to={`/postings/edit/${props.id}`} size="sm">{t('Edit')}</Button>
        <Button onClick={handleClickArchive} size="sm">{t('Archive')}</Button>
        <Button onClick={handleClickDelete} size="sm">{t('Delete')}?</Button>
      </ButtonGroup>
    </td>
  </tr>;
  
}

export default PostingsListItem;