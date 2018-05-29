import React, { PureComponent } from 'react';
import InsideBanner from './InsideBanner';

class BlogDetail extends PureComponent {
  render() {
    return (
      <main className="blog">
        <InsideBanner />
        <section className="container">
          <div className="spacer blog">
            <div className="row">
              <div className="col-lg-8">

                <h2 className="sub-title">Creative business to takeover the market</h2>
                <div className="info">Posted on: Jan 20, 2013</div>
                <img src="/static/images/blog-5.jpg" className="thumbnail img-responsive" alt="blog title" />
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}


export default BlogDetail;
