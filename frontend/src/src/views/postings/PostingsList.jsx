import React from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import PostingListItem from './PostingsListItem'
import { connect } from 'react-redux'


function PostingsList( { postings } ){

  const { t } = useTranslation();
  
    
    return <Row>
      <Col>
        <Table>
          <thead>
            <tr>
              <th>{t('Employer')}</th>
              <th>{t('Job title')}</th>
              <th>{t('Functions')}</th>
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

  function selectPostings( root_reducer ) {
    return {
      postings: root_reducer.posting.postings
    };
  }

  export default connect(selectPostings)(PostingsList);