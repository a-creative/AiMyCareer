import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";


function PostingsListItem( props : IPosting ) {

  const { t } = useTranslation();

  return <tr key="{props.id}">
    <td>{props.employer}</td>
    <td>{props.job_title}</td>
    <td>
      <ButtonGroup aria-label="{t('Functions')}">
        <Button as={Link} to={`/postings/edit/${props.id}`} size="sm">{t('Edit')}</Button>
        <Button as={Link} to={`/postings/archieve/${props.id}`} size="sm">{t('Archieve')}</Button>
        <Button as={Link}  to={`/postings/delete/${props.id}`}  size="sm">{t('Delete')}?</Button>
      </ButtonGroup>
    </td>
  </tr>;
  
}

export default PostingsListItem;