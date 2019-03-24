import React from 'react';
import { Link } from 'react-router-dom';
import InsideBanner from './InsideBanner';

const NotFound = () => (
  <main className="about">
    <InsideBanner title="Page not found" />
    <section className="container">
      <div className="spacer">
        <div className="row">
          <div className="col-lg-8  col-lg-offset-2">
            <h3>Page not found</h3>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default NotFound;
