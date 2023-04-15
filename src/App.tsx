import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Map from './components/map/map';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Map/>
    </div>
  );
}

export default App;
