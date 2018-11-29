import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import PropertyContainer from '../containers/PropertyContainer';
import AgentsContainer from '../containers/AgentsContainer';
import SearchContainer from '../containers/SearchContainer';
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
    <Route exact path="/blog" component={Blog} />
    <Route path="/property/:name" component={PropertyContainer} />
    <Route path="/blog/:name" component={BlogDetail} />
    <Route path="/not-found" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
