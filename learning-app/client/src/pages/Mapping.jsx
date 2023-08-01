import React from 'react';
import { Link } from 'react-router-dom';

function Mapping() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
      <a href="/images/mapsg.PNG" target="_blank" rel="noopener noreferrer">
        <img src="/images/mapsg.PNG" alt="Image" style={{ display: 'block', margin: '0 auto', width: '80%' }} />
      </a>
      <h1 style={{ textAlign: 'center', marginTop: '0', fontSize: '24px' }}>Please select an area of the Charging Station you wish to seek</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link to={{ pathname: '/customerview', search: '?area=North' }} style={boxStyle}>North</Link>
        <Link to={{ pathname: '/customerview', search: '?area=South' }} style={boxStyle}>South</Link>
        <Link to={{ pathname: '/customerview', search: '?area=East' }} style={boxStyle}>East</Link>
        <Link to={{ pathname: '/customerview', search: '?area=West' }} style={boxStyle}>West</Link>
      </div>
    </div>
  );
}

const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '100px',
  margin: '10px',
  border: '1px solid black',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'black',
};

export default Mapping;