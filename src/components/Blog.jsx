import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import InsideBanner from './InsideBanner';

class Blog extends PureComponent {
  render() {
    return (
      <main className="blog">
        <InsideBanner />
        <section className="container">
          <div className="spacer blog">
            <div className="row">
              <div className="col-lg-8 col-sm-12 ">


                <div className="row">
                  <div className="col-lg-4 col-sm-4 ">
                    <Link to="/blog/415-Point-Cook-Road-Point-Cook-Victoria" className="thumbnail">
                      <img src="/static/images/blog-5.jpg" alt="blog title" />
                    </Link>
                  </div>
                  <div className="col-lg-8 col-sm-8 ">
                    <h3>
                      <Link to="/blog/415-Point-Cook-Road-Point-Cook-Victoria">Creative business to takeover the market</Link>
                    </h3>
                    <div className="info">Posted on: Jan 20, 2013</div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <Link to="/blog/blog-name" className="more">Read More</Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}


export default Blog;
