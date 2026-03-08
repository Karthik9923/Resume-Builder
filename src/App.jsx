import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Builder from './pages/Builder';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/builder" element={<Builder />} />
    </Routes>
  );
}

export default App;
