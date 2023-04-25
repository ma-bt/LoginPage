import { lazy } from 'react';

// const LoginPage = lazy(() => import('pages/LoginPage'));
import { LoginPage } from 'pages/LoginPage';


import { CreateUserPage } from 'pages/CreateUserPage';

export const routes = [

  {
    path: '/LoginPage',
    element: <LoginPage />,
  },

  {
    path: '/create-user-page',
    element: <CreateUserPage />
  },
];

export default routes;
