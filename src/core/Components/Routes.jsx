import React, { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import AuthRoute from '@/core/Containers/AuthorizedRouteContainer';
import MainSpinner from './MainSpinner';

const HomeContainer = lazy(() => import(/* webpackChunkName: "home" */'@/modules/PublicArea/Containers/HomeContainer'))
const PropertyContainer = lazy(() => import(/* webpackChunkName: "propertydetail" */'@/modules/Properties/Containers/PropertyContainer'))
const AgentsContainer = lazy(() => import(/* webpackChunkName: "agent" */'@/modules/Agents/Containers/AgentsContainer'))
const SearchContainer = lazy(() => import(/* webpackChunkName: "search" */'@/modules/Search/Containers/SearchContainer'))
const RegisterContainer = lazy(() => import(/* webpackChunkName: "register" */'@/modules/PublicArea/Containers/RegisterContainer'))
const UserDetailsContainer = lazy(() => import(/* webpackChunkName: "userdetail" */'@/modules/User/Containers/UserDetailsContainer'))

const About = lazy(() => import(/* webpackChunkName: "about" */'@/modules/PublicArea/Components/About'));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */'@/modules/PublicArea/Components/Blog'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */'@/modules/PublicArea/Components/Contact'));
const BlogDetail = lazy(() => import(/* webpackChunkName: "blogdetail" */'@/modules/PublicArea/Components/BlogDetail'));
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */'@/core/Components/NotFound'));

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
