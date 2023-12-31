import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@ui5/webcomponents-react';

import './global.scss';

import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { NotFound } from './pages/NotFound';
import { ReduxProvider } from './redux/provider.tsx';

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movie/:imdbID',
        element: <Movie />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <RouterProvider router={route} />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
