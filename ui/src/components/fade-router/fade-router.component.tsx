import React, { PropsWithChildren } from 'react';
import { Router, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './fade-router.module.scss';

export const FadeTransitionRouter = (props: PropsWithChildren<unknown>) => (
  <Location>
    {({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames={{ ...styles }} timeout={300}>
          {/* the only difference between a router animation and
              any other animation is that you have to pass the
              location to the router so the old screen renders
              the "old location" */}
          <Router location={location}>{props.children}</Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);
