import React from 'react';
import { SearchPage, InfoPage, NotFoundPage } from './pages';

export type InfoRouteProps = { name?: string };

export const Route = {
  root: '/',
  search: '/search',
  info: '/pokemon/:name',
  notFound: '/not-found',
};

const rootRoute = () => <SearchPage />;
const notFoundRoute = () => <NotFoundPage />;
const infoRoute = ({ name }: InfoRouteProps) => <InfoPage name={name} />;

export const routes = {
  [Route.root]: rootRoute,
  [Route.search]: rootRoute,
  [Route.info]: infoRoute,
  [Route.notFound]: notFoundRoute,
};
