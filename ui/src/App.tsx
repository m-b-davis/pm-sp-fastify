import React from 'react';
import { Router } from '@reach/router';

import { SearchPage, InfoPage } from './pages';
import { BaseLayout } from './components';

import 'normalize.css';
import './styles/global.scss';

export const Routes = {
  root: '/',
  search: '/search',
  info: '/pokemon/:name',
  notFound: '/not-found',
};

export const createInfoRoute = (name: string) => `/pokemon/${name}`;

function App() {
  return (
    <BaseLayout>
      <Router>
        <InfoPage path={Routes.info} />
        <SearchPage default path={Routes.root} />
      </Router>
    </BaseLayout>
  );
}

export default App;
