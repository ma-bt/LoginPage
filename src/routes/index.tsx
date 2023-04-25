import { lazy } from 'react';
const IndexPage = lazy(() => import('pages/Index'));
// const LoginPage = lazy(() => import('pages/LoginPage'));
import { LoginPage } from 'pages/LoginPage';


import { CreateUserPage } from 'pages/CreateUserPage';

export const routes = [
  // {
  //   path: '/',
  //   element: <IndexPage />,
  // },
  {
    path: '/',
    element: <LoginPage />,
  },
 
  {
    path: '/create-user-page',
    element: <CreateUserPage />
  },
];

export default routes;
