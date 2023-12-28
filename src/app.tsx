import loadable from '@loadable/component';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';

import Provider from 'provider';

const AuthLayout = loadable(() => import('layouts/AuthLayout'));
const MainLayout = loadable(() => import('layouts/MainLayout'));

const IndexPage = loadable(() => import('pages/index'));
const JoinPage = loadable(() => import('pages/join'));
const N10303Page = loadable(() => import('pages/N10303'));

const App = () => (
  <RouterProvider
    router={createBrowserRouter(
      createRoutesFromElements(
        <Route element={<Provider />}>
          <Route element={<MainLayout />} loader={MainLayout.load}>
            <Route path='/' element={<IndexPage />} loader={IndexPage.load} />
            <Route path='/join' element={<JoinPage />} loader={JoinPage.load} />
            <Route path='/N10303' element={<N10303Page />} loader={N10303Page.load} />
          </Route>
          ,
          <Route
            element={<AuthLayout />}
            loader={() => {
              if (!document.cookie.includes('access_token')) return redirect('/');
              return AuthLayout.load();
            }}
          >
            <Route path='/home' element={<>홈화면</>} />
            <Route path='/post' element={<>게시글화면</>} />
            <Route path='/N10303' element={<N10303Page/>} />
          </Route>
        </Route>,
      ),
    )}
  />
);

export default App;
