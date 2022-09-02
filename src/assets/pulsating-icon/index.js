import React from 'react';
import './pulsating.scss';

const PulsatingIcon = ({ children }) => (
  <>
    <div className="pulsating" />
    {children}
  </>
);

export default PulsatingIcon;
