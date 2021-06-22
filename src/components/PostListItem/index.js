import React from 'react';

const PostListItem = ({ postItem, onClick }) => {
  return (
    <tr onClick={onClick}>
      <td>{postItem.idx}</td>
      <td>{postItem.title}</td>
      <td>{postItem.payOut}</td>
      <td>{postItem.status}</td>
    </tr>
  );
};

export default PostListItem;
