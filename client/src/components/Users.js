import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/users?page=${page}&limit=${limit}`;
      const result = await axios.get(url);
      setData(result.data);
    };
    fetchData();
  }, [limit, page]);

  const fetchNewUsers = async (url) => {
    let res = await axios.get(url);
    setData(res.data);
  };

  const { currentPage, next, prev, totalPages, users } = data;
  return (
    <Fragment>
      <form className='selectors'>
        <div className='page-selector'>
          <input
            type='number'
            name='page'
            onChange={(e) => setPage(e.target.value)}
            placeholder='page number'
          />
        </div>
        <div className='limit-selector'>
          <input
            type='number'
            name='limit'
            onChange={(e) => setLimit(e.target.value)}
            placeholder='page limit'
          />
        </div>
      </form>
      <table className='user-list'>
        <tbody>
          <tr>
            <th>Index</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
          {users &&
            users.map((user, i) => {
              let count = i + 1;
              const { first_name, last_name, email } = user;
              return (
                <tr key={i}>
                  <td>{count}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='controls'>
        <div className='button-container'>
          {prev && (
            <button
              className='btn prev-btn'
              onClick={() => {
                fetchNewUsers(prev);
              }}
            >
              prev
            </button>
          )}
          {next && (
            <button
              className='btn next-btn'
              onClick={() => fetchNewUsers(next)}
            >
              next
            </button>
          )}
        </div>
        <div>
          <span className='page-info'>current page</span> -{' '}
          <span className='current-page'>{currentPage}</span>
        </div>
        <div>
          <span className='page-info'>total pages</span> -{' '}
          <span className='total-pages'>{totalPages}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
