import { useState } from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Home />
    </>
  );
}

export default App
