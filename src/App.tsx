import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from 'components/navbar/NavBar';
import Map from 'components/map/Map';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import {h1, h2, h3, h4} from 'style/global'
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'style/theme';

function App() {
  return (
    <React.Fragment>
      
    <RecoilRoot>
      <ThemeProvider theme={theme}></ThemeProvider>
      <Global styles={[h1, h2, h3, h4]}/>
      <NavBar></NavBar>
      <Map/>
      </RecoilRoot>
    </React.Fragment>

  );
}

export default App;
