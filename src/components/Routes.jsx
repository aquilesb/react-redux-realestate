import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import AuthRoute from '../containers/AuthorizedRouteContainer';
import HomeContainer from '../containers/HomeContainer';
import PropertyContainer from '../containers/PropertyContainer';
import AgentsContainer from '../containers/AgentsContainer';
import SearchContainer from '../containers/SearchContainer';
import RegisterContainer from '../containers/RegisterContainer';
import UserDetailsContainer from '../containers/UserDetailsContainer';
import About from './About';
import Blog from './Blog';
import Contact from './Contact';
import BlogDetail from './BlogDetail';
import NotFound from './NotFound';

const Routes = () => (
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
);

export default Routes;
