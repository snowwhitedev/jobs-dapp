import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();

  return <p>This is Post(id: {id}) detail claim page </p>;
};

export default PostDetail;
