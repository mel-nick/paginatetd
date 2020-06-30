import React, { Fragment } from 'react';

const Button = ({ handleClick, children, className }) => {
  return (
    <Fragment>
      <button
        //   className='btn prev-btn'
        onClick={handleClick}
        className={className}
      >
        {children}
      </button>
    </Fragment>
  );
};

export default Button;
