import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import UsersList from './components/UsersList';
import Spinner from './components/Spinner';
import Button from './components/Button';

const App = () => {
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

  return !users ? (
    <Spinner />
  ) : (
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
      <UsersList users={users} />
      <div className='controls'>
        <div className='button-container'>
          {prev && (
            <Button
              className='btn prev-btn'
              handleClick={() => fetchNewUsers(prev)}
            >
              prev
            </Button>
          )}
          {next && (
            <Button
              className='btn next-btn'
              handleClick={() => fetchNewUsers(next)}
            >
              {' '}
              next
            </Button>
          )}
        </div>
        <div>
          <span className='page-info'> current page </span> -{' '}
          <span className='current-page'> {currentPage} </span>
        </div>
        <div>
          <span className='page-info'> total pages </span> -{' '}
          <span className='total-pages'> {totalPages} </span>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
