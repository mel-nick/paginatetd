import React from 'react';

const SearchBar = ({ fetchUsers, setSearchString }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input
        type='text'
        onChange={(e) => {
          !e.target.value && fetchUsers();
          setSearchString(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
