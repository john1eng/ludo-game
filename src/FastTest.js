import React from 'react';
import { useDispatch } from 'react-redux';
import { ludoAction } from './store';

function FastTest () {
  const dispatch = useDispatch();

  const fastTestHandler = () => {
    dispatch(ludoAction.fastTest());
  };

  return (
    <button onClick={ fastTestHandler }>FastTest</button>
  );
}

export default FastTest;
