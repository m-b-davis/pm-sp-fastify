import React from 'react';

import { SearchPage, InfoPage } from './pages';
import { BaseLayout, FadeTransitionRouter } from './components';

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
      <FadeTransitionRouter>
        <InfoPage path={Routes.info} />
        <SearchPage default path={Routes.root} />
      </FadeTransitionRouter>
    </BaseLayout>
  );
}

export default App;
