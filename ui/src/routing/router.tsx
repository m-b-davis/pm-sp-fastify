import React from 'react';
import { useRoutes, usePath } from 'hookrouter';
import { SearchPage, InfoPage, NotFoundPage } from 'src/pages';
import { InfoRouteProps } from '.';

export const Routes = {
  root: '/',
  search: '/search',
  info: '/pokemon/:name',
  notFound: '/not-found',
};

export const createInfoRoute = (name: string) => `/pokemon/${name}`;

const rootRoute = () => <SearchPage />;
const notFoundRoute = () => <NotFoundPage />;
const infoRoute = ({ name }: InfoRouteProps) => <InfoPage name={name} />;

const routes = {
  [Routes.root]: rootRoute,
  [Routes.search]: rootRoute,
  [Routes.info]: infoRoute,
  [Routes.notFound]: notFoundRoute,
};

export function Router() {
  const route = useRoutes(routes);

  usePath();

  return route || <NotFoundPage />;
}
