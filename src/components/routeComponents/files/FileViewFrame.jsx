import React, { Component } from 'react';

function FileViewFrame({ frameSrc }) {
  return (
    <div style={{ height: '100%' }}>
      <iframe src={frameSrc} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default FileViewFrame;
