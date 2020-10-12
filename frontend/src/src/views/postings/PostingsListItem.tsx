import React from 'react';

function PostingsListItem( props : IPosting ) {

    return <tr key="{props.id}">
      <td>{props.job_title}</td>
      <td>{props.employer}</td>
    </tr>;
  
}

export default PostingsListItem;