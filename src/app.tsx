import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from 'layouts/AuthLayout';

const IndexPage = loadable(() => import('pages/index'));

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
      <Route element={<AuthLayout />}>
        <Route path='/post' element={<></>} />
        <Route path='/post/create' element={<></>} />
      </Route>
    </Routes>
  );
};

export default App;
