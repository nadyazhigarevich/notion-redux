import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import UserContextProvider from './components/UserContextProvider';
import RequireAuth from './components/RequireAuth';
import NotFound from './pages/NotFound';
import Notes from './pages/Notes';
import CreateNotePage from './pages/CreatePage'; 
import EditNotePage from './pages/EditPage'; 
import NotePage from './pages/Note';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: '/notes', 
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        ),
      },
      {
        path: '/create-note',
        element: (
          <RequireAuth>
            <CreateNotePage />
          </RequireAuth>
        ),
      },
      {
        path: '/edit-note/:id', 
        element: (
          <RequireAuth>
            <EditNotePage />
          </RequireAuth>
        ),
      },
      {
        path: '/note/:id', 
        element: (
          <RequireAuth>
            <NotePage />
          </RequireAuth>
        ),
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;