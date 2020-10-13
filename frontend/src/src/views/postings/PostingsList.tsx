import React, { useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from "../../store/reducers";
import PostingListItem from './PostingsListItem'
import { setPostings } from '../../store/actions'

function PostingsList(){

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPostings = async () => {
      var base_url = document.location.protocol + "//" + document.location.hostname + ":5002";
      const response = await fetch( base_url + '/api/job_postings');
      const resData = await response.json();

      let postings : readonly IPosting[] = resData.posting.postings;

      var loadedPostings : IPosting[] = [...postings];
      
      dispatch(setPostings( loadedPostings ));
    }
    fetchPostings()
  }, [ dispatch ])

    const { t } = useTranslation();
  
    const postings : readonly IPosting[] = useSelector( ( state : RootState ) => state.posting.postings );
  
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

  export default PostingsList;