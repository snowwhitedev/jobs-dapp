import React from 'react';
import { useHistory } from 'react-router-dom';

import PostListItem from '../../components/PostListItem';

const Posts = () => {
  const history = useHistory();
  const posts = [
    { _id: '0x001', title: 'Post1', payOut: 1, status: 'open' },
    { _id: '0x002', title: 'Post2', payOut: 2, status: 'pending' },
    { _id: '0x003', title: 'Post3', payOut: 3, status: 'closed' }
  ];

  const handleListItemClick = (_id) => {
    history.push({ pathname: `/posts/${_id}` });
  };

  const postList = posts.map((post, idx) => {
    const postItem = { idx: Number(idx) + 1, ...post };
    return (
      <PostListItem
        key={idx}
        postItem={postItem}
        onClick={() => handleListItemClick(post._id)}
      />
    );
  });

  return (
    <>
      <h3>Things to do</h3>
      <form className='well form-search'>
        <input type='text' className='input-medium search-query' />
        <button type='button' className='btn'>
          Search
        </button>
      </form>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Post title</th>
            <th>Pays out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{postList}</tbody>
      </table>
      <ul className='pager pull-right'>
        <li>
          <a href='#'>Previous</a>
        </li>
        <li>
          <a href='#'>Next</a>
        </li>
      </ul>
    </>
  );
};

export default Posts;
