import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Map from './components/map/map';
import styled from '@emotion/styled';

const MainContainer = styled.div`
  display:flex;
`

function App() {
  return (
    <MainContainer>
      <NavBar></NavBar>
      <Map/>
    </MainContainer>
  );
}

export default App;
