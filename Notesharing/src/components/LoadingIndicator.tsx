// import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoadingIndicator = () => {
  return(
    <div className="loading-indicator">
    <Oval color="#000000" height={50} width={50} />
  </div>
  )
}

export default LoadingIndicator;