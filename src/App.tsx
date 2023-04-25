import { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PrivateRoute } from 'routes/privateRoute';
import { LoginPage } from 'pages/LoginPage';

import { TablePage } from 'pages/TablePage';
import { CreateUserPage } from 'pages/CreateUserPage';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'


const queryClient = new QueryClient()

function App() {
  return (
    <Suspense fallback={<Spinner />}>
       <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path={'/add-user-page'} element={
            <PrivateRoute>
              {<TablePage />}
            </PrivateRoute>
          } />
          <Route path={'/'} element=

            {<LoginPage />}
          />
          <Route path={'/create-user-page'} element=

            {<CreateUserPage />}
          />
        </Routes>
      </Router>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
