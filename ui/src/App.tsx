import React, { PropsWithChildren } from 'react';
import { Router } from './routing';

import 'normalize.css';
import styles from './App.module.css';

function App() {
  return (
    <BaseLayout>
      <Router />
    </BaseLayout>
  );
}

const BaseLayout = (props: PropsWithChildren<unknown>) => {
  return <div className={styles.app}>{props.children}</div>;
};

export default App;
