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
<<<<<<< HEAD
const N10405Page = loadable(() => import('pages/n10405'));
=======
>>>>>>> fd434aa95da04f1e121f0a8962c0e771d9b98661

const App = () => (
  <RouterProvider
    router={createBrowserRouter(
      createRoutesFromElements(
        <Route element={<Provider />}>
          <Route element={<MainLayout />} loader={MainLayout.load}>
            <Route path='/' element={<IndexPage />} loader={IndexPage.load} />
            <Route path='/join' element={<JoinPage />} loader={JoinPage.load} />
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
            <Route path='/n10405' element={<N10405Page/>} loader={N10405Page.load} />
          </Route>
        </Route>,
      ),
    )}
  />
);

export default App;
