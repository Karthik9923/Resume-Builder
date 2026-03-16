import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Builder from './pages/Builder';
import Landing from './pages/Landing';
import Templates from './pages/Templates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/templates" element={<Templates />} />
    </Routes>
  );
}

export default App;
