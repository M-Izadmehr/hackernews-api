import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import SinglePageConcurrent from '../../containers/HomePage/SinglePageConcurrent';
import InfiniteScroll from '../../containers/HomePage/InfiniteScroll';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/hackernews-api/" component={InfiniteScroll} />
        <Route exact path="/hackernews-api/SinglePageConcurrent" component={SinglePageConcurrent} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}
