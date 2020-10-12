import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from "../../reducers";
import PostingListItem from './PostingsListItem'

function PostingsList(){

    const { t } = useTranslation();
  
    const postings : readonly IPosting[] = useSelector( ( state : RootState ) => state.posting.postings );
  
    return <Row>
      <Col>
        <Table>
          <thead>
            <tr>
              <th>{t('Job title')}</th>
              <th>{t('Employer')}</th>
            </tr>
          </thead>
          <tbody>
            {postings.map(posting => (
              <PostingListItem 
                key={posting.id}
                id={posting.id}
                employer={posting.employer}
                job_title={posting.job_title}
              />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  }

  export default PostingsList;