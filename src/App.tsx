import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Map from 'components/map/Map';
import styled from '@emotion/styled';

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Map/>
    </React.Fragment>

  );
}

export default App;
