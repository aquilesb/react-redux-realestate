import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import Carousel from 'nuka-carousel';
import InsideBanner from '../components/InsideBanner';
import { format2Money } from '../utils/formatUtils';
import { carouselDots } from '../utils/carouselUtils';

class PropertyContainer extends PureComponent {
  render() {
    const { property } = this.props;
    if (!property) {
      return null;
    }

    return (
      <main className="property-section">
        <InsideBanner />
        <section className="container">
          <div className="properties-listing spacer">
            <div className="row">
              <div className="col-lg-3 col-sm-4 hidden-xs">
                <div className="hot-properties hidden-xs">
                  <h4>Hot Properties</h4>
                  <div className="row">
                    <div className="col-lg-4 col-sm-5"><img src="/static/images/3.jpg" className="img-responsive img-circle" alt="properties" /></div>
                    <div className="col-lg-8 col-sm-7">
                      <h5><a href="property-detail.php">Integer sed porta quam</a></h5>
                      <p className="price">$300,000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-5"><img src="/static/images/3.jpg" className="img-responsive img-circle" alt="properties" /></div>
                    <div className="col-lg-8 col-sm-7">
                      <h5><a href="property-detail.php">Integer sed porta quam</a></h5>
                      <p className="price">$300,000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-5"><img src="/static/images/3.jpg" className="img-responsive img-circle" alt="properties" /></div>
                    <div className="col-lg-8 col-sm-7">
                      <h5><a href="property-detail.php">Integer sed porta quam</a></h5>
                      <p className="price">$300,000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-5"><img src="/static/images/3.jpg" className="img-responsive img-circle" alt="properties" /></div>
                    <div className="col-lg-8 col-sm-7">
                      <h5><a href="property-detail.php">Integer sed porta quam</a></h5>
                      <p className="price">$300,000</p>
                    </div>
                  </div>
                </div>
                <div className="advertisement">
                  <h4>Advertisements</h4>
                  <img src="/static/images/advertisements.jpg" className="img-responsive" alt="advertisement" />
                </div>
              </div>
              <div className="col-lg-9 col-sm-8 name">
                <h2>{property.get('name')}</h2>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="property-images">
                      <Carousel
                        slidesToShow={1}
                        swiping
                        renderBottomCenterControls={carouselDots}
                      >
                        {property.get('images').map(url => <img src={url} key={url} className="property-img" alt="properties" />)}
                      </Carousel>
                    </div>
                    <div className="spacer detail">
                      <h4>
                        <span className="glyphicon glyphicon-th-list" />
                        Properties Detail
                      </h4>
                      {renderHTML(property.get('detail'))}
                    </div>
                    <div>
                      <h4>
                        <span className="glyphicon glyphicon-map-marker" />
                        Location
                      </h4>
                      <div className="well">
                        <iframe width="100%" height="350" title="map" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Pulchowk,+Patan,+Central+Region,+Nepal&amp;aq=0&amp;oq=pulch&amp;sll=37.0625,-95.677068&amp;sspn=39.371738,86.572266&amp;ie=UTF8&amp;hq=&amp;hnear=Pulchowk,+Patan+Dhoka,+Patan,+Bagmati,+Central+Region,+Nepal&amp;ll=27.678236,85.316853&amp;spn=0.001347,0.002642&amp;t=m&amp;z=14&amp;output=embed" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="col-lg-12  col-sm-6">
                      <div className="property-info">
                        <p className="price">$ {format2Money(property.get('price'))}</p>
                        <p className="area">
                          <span className="glyphicon glyphicon-map-marker" />
                          {property.get('address')}
                        </p>
                        <div className="profile">
                          <span className="glyphicon glyphicon-user" />
                          Agent Details
                          <p>{property.getIn(['agent', 'name'])}<br />{property.getIn(['agent', 'phone'])}</p>
                        </div>
                      </div>
                      <h6><span className="glyphicon glyphicon-home" /> Availabilty</h6>
                      <div className="listing-detail">
                        <span title="Bed Room" className="bedroom">{property.getIn(['features', 'bedroom'])}</span>
                        <span title="Baths" className="bathroom">{property.getIn(['features', 'bathroom'])}</span>
                        <span title="Parking" className="parking">{property.getIn(['features', 'parking'])}</span>
                        <span title="Kitchen" className="kitchen">{property.getIn(['features', 'kitchen'])}</span>
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-6 ">
                      <div className="enquiry">
                        <h6><span className="glyphicon glyphicon-envelope" />Post Enquiry</h6>
                        <div role="form" className="contact-form">
                          <input type="text" className="form-control name" placeholder="Full Name" />
                          <input type="email" className="form-control email" placeholder="you@yourdomain.com" />
                          <input type="text" className="form-control phone" placeholder="your number" />
                          <textarea rows="6" className="form-control text" placeholder="Whats on your mind?" />
                          <button type="submit" className="btn btn-primary" name="Submit">Send Message</button>
                        </div>
                      </div>
                    </div>
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

PropertyContainer.propTypes = {
  property: ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
    encodedUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: ImmutablePropTypes.list.isRequired,
    price: PropTypes.number.isRequired,
    features: ImmutablePropTypes.contains({
      bedroom: PropTypes.number.isRequired,
      bathroom: PropTypes.number.isRequired,
      parking: PropTypes.number.isRequired,
      kitchen: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

PropertyContainer.defaultProps = {
  property: null,
};

const mapStateToProps = (state, { match }) => {
  const property = state.getIn(['properties', 'featured']).find(item => item.get('encodedUrl') === match.params.name);
  return { property };
};

const functions = {};

export default connect(mapStateToProps, functions)(PropertyContainer);
