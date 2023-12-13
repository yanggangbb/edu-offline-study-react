import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';

const IndexPage = loadable(() => import('pages/index'));

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  );
};

export default App;
