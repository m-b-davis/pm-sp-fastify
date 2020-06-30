import React, { PropsWithChildren } from 'react';
import { Router } from '@reach/router';

import { SearchPage, NotFoundPage, InfoPage } from './pages';

import 'normalize.css';
import styles from './App.module.css';

function App() {
  return (
    <BaseLayout>
      <Router>
        <SearchPage path="" />
        <InfoPage path="/pokemon/:name" />
        <NotFoundPage default />
      </Router>
    </BaseLayout>
  );
}

const BaseLayout = (props: PropsWithChildren<unknown>) => {
  return <div className={styles.app}>{props.children}</div>;
};

export default App;
