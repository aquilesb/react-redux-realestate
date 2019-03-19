import React, { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import AuthRoute from '../containers/AuthorizedRouteContainer';
import MainSpinner from './MainSpinner';

const HomeContainer = lazy(() => import(/* webpackChunkName: "home" */'../containers/HomeContainer'))
const PropertyContainer = lazy(() => import(/* webpackChunkName: "propertydetail" */'../containers/PropertyContainer'))
const AgentsContainer = lazy(() => import(/* webpackChunkName: "agent" */'../containers/AgentsContainer'))
const SearchContainer = lazy(() => import(/* webpackChunkName: "search" */'../containers/SearchContainer'))
const RegisterContainer = lazy(() => import(/* webpackChunkName: "register" */'../containers/RegisterContainer'))
const UserDetailsContainer = lazy(() => import(/* webpackChunkName: "userdetail" */'../containers/UserDetailsContainer'))

const About = lazy(() => import(/* webpackChunkName: "about" */'./About'));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */'./Blog'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */'./Contact'));
const BlogDetail = lazy(() => import(/* webpackChunkName: "blogdetail" */'./BlogDetail'));
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */'./NotFound'));

const Routes = () => (
  <Suspense fallback={ <div className="main-spinner-wrapper"><MainSpinner /></div> }>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/search" component={SearchContainer} />
      <Route path="/about" component={About} />
      <Route path="/agents" component={AgentsContainer} />
      <Route path="/contact" component={Contact} />
      <Route path="/register" component={RegisterContainer} />
      <Route exact path="/blog" component={Blog} />
      <Route path="/blog/:name" component={BlogDetail} />
      <Route path="/property/:name" component={PropertyContainer} />
      <AuthRoute path="/my-account" component={UserDetailsContainer} needAuth />
      <Route path="/not-found" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
