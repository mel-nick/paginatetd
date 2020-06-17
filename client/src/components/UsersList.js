import React, { Fragment } from 'react';
import UsersListItem from './UsersListItem';

const UsersList = ({ users }) => {
  return (
    <Fragment>
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
              return <UsersListItem key={i} {...user} counter={count} />;
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default UsersList;
