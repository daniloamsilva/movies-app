import { Outlet } from 'react-router-dom';
import { Bar } from '@ui5/webcomponents-react';

import './App.scss';

function App() {
  return (
    <>
      <Bar design="Header">Movies App</Bar>
      <main>
        <h1>Hello World!</h1>
        <Outlet />
      </main>
    </>
  )
}

export default App;
