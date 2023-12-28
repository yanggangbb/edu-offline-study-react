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

const N10308Page = loadable(() => import('pages/N10308'));
const N10312Page = loadable(() => import('pages/N10312'));
const N10405Page = loadable(() => import('pages/n10405'));

const N10306Page = loadable(() => import('pages/N10306'));
const N10419Page = loadable(() => import('pages/N10419'));
const N10303Page = loadable(() => import('pages/N10303'));
const N10404Page = loadable(() => import('pages/N10404'));
const N10407Page = loadable(() => import('pages/N10407'));
const N10406Page = loadable(() => import('pages/n10406'));
const N20000511Page = loadable(() => import('pages/N20000511'));

const App = () => (
  <RouterProvider
    router={createBrowserRouter(
      createRoutesFromElements(
        <Route element={<Provider />}>
          <Route element={<MainLayout />} loader={MainLayout.load}>
            <Route path='/' element={<IndexPage />} loader={IndexPage.load} />
            <Route path='/join' element={<JoinPage />} loader={JoinPage.load} />
          </Route>
          <Route
            element={<AuthLayout />}
            loader={() => {
              if (!document.cookie.includes('access_token')) return redirect('/');
              return AuthLayout.load();
            }}
          >
            <Route path='/home' element={<>홈화면</>} />
            <Route path='/post' element={<>게시글화면</>} />
            <Route path='/N10308' element={<N10308Page />} loader={N10308Page.load} />
            <Route path='/N10312' element={<N10312Page />} loader={N10312Page.load} />
            <Route path='/n10405' element={<N10405Page />} loader={N10405Page.load} />
            <Route path='/N10306' element={<N10306Page />} loader={N10306Page.load} />
            <Route path='/N10419' element={<N10419Page />} loader={N10419Page.load} />
            <Route path='/N10303' element={<N10303Page />} loader={N10303Page.load} />
            <Route path='/N10404' element={<N10404Page />} loader={N10404Page.load} />
            <Route path='/N10407' element={<N10407Page />} loader={N10407Page.load} />
            <Route path='/N10406' element={<N10406Page />} loader={N10406Page.load} />
            <Route path='/N20000511' element={<N20000511Page />} loader={N20000511Page.load} />
          </Route>
        </Route>,
      ),
    )}
  />
);

export default App;
