import React, { Fragment } from 'react';

const UsersListItem = ({ first_name, last_name, email, counter }) => {
  return (
    <Fragment>
      <tr>
        <td>{counter}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{email}</td>
      </tr>
    </Fragment>
  );
};

export default UsersListItem;
