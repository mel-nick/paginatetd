import React, { Fragment } from 'react';

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
     </Fragment>
  );
};

export default UsersList;
