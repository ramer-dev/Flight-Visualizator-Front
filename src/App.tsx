import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from 'components/navbar/NavBar';
import Map from 'components/map/Map';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { h1, h2, h3, h4 } from 'style/global'

const Container = styled.div`
  display:flex;
`
function App() {
  return (
    <React.Fragment>
      <Global styles={[h1, h2, h3, h4]} />
      <Container>
        <NavBar></NavBar>
        <Map />
      </Container>
    </React.Fragment>

  );
}

export default App;
