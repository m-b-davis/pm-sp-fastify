import React from 'react';
import { Router } from '@reach/router';

import { SearchPage, NotFoundPage, InfoPage } from './pages';
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
        <SearchPage path="/" />
        <InfoPage path="/pokemon/:name" />
        <NotFoundPage default />
      </Router>
    </BaseLayout>
  );
}

export default App;
