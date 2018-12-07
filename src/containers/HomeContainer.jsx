import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Carousel from 'nuka-carousel';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { updateLoginModalIsOpen } from '../actions/layoutActions';
import { changeSearchField } from '../actions/searchActions';
import { onSearchProperty } from '../actions/propertieActions';
import { login } from '../actions/userActions';
import LoginModal from '../components/LoginModal';
import PropertyListItem from '../components/PropertyListItem';
import PropertyRecommended from '../components/PropertyRecommended';
import { carouselDots } from '../utils/carouselUtils';

class HomeContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  closeLoginModal() {
    this.props.updateLoginModalIsOpen(false);
  }

  openLoginModal(e) {
    e.preventDefault();
    this.props.updateLoginModalIsOpen(true);
  }

  render() {
    const {
      featuredProperties,
      loginModalOpen,
      recommendedProperties,
      priceTypes,
      searchType,
      loginAction,
    } = this.props;
    const priceListItem = priceTypes.find(item => item.get('type') === searchType);

    return (
      <main className="home">
        <div className="banner-search">
          <div className="search-wrapper">
            <div className="container">
              <h3>Buy, Sale & Rent</h3>
              <form className="searchbar" onSubmit={this.props.onSearchProperty}>
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <input type="text" className="form-control" placeholder="Search of Properties" />
                    <div className="row">
                      <div className="col-lg-3 col-sm-3 ">
                        <select className="form-control buy" value={searchType} onChange={e => this.props.changeSearchField('type', e.target.value)}>
                          <option value="1">Buy</option>
                          <option value="2">Rent</option>
                          <option value="3">Sale</option>
                        </select>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <select className="form-control price" onChange={e => this.props.changeSearchField('price', e.target.value)}>
                          <option value="">Price</option>
                          {!!priceListItem.get('list') && priceListItem.get('list').map(item => <option key={item}>{item}</option>)}
                        </select>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <select className="form-control property" onChange={e => this.props.changeSearchField('property', e.target.value)}>
                          <option value="">Property</option>
                          <option value="1">Apartment</option>
                          <option value="2">Building</option>
                          <option value="3">Office Space</option>
                        </select>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <input type="submit" className="btn btn-success btn-find-now" value="Find Now" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-lg-offset-1 col-sm-6 ">
                    <p>Join now and get updated with all the properties deals.</p>
                    <button className="btn btn-info" onClick={this.openLoginModal}>Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <section className="content-container container">
          <div className="properties-listing spacer">
            <Link to="/search" className="pull-right viewall">View All Listing</Link>
            <h2>Featured Properties</h2>
            <Carousel
              id="featured-properties-list"
              slidesToShow={5}
              cellSpacing={10}
              swiping
              renderBottomCenterControls={carouselDots}
            >
              { featuredProperties.map(item => <PropertyListItem key={item.get('id')} item={item} />) }
            </Carousel>
          </div>
          <div className="spacer">
            <div className="row">
              <div className="col-lg-6 col-sm-9 recent-view">
                <h3>About Us</h3>
                <p>
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
                   those interested. Sections 1.10.32 and 1.10.33 from &#x22;de Finibus Bonorum
                  et Malorum&#x22; by Cicero are also reproduced in their exact original form,
                   accompanied by English versions from the 1914 translation by H. Rackham.
                  <br />
                  <Link to="/about">Learn More</Link>
                </p>
              </div>
              <div className="col-lg-5 col-lg-offset-1 col-sm-3 recommended">
                <h3>Recommended Properties</h3>
                <Carousel
                  id="recommended-properties-list"
                  slidesToShow={1}
                  swiping
                  renderBottomCenterControls={carouselDots}
                  decorators={[]}
                >
                  {recommendedProperties.map(item => <PropertyRecommended item={item} key={item.get('id')} />)}
                </Carousel>
              </div>
            </div>
          </div>
        </section>
        <ReactModal isOpen={loginModalOpen} onRequestClose={this.closeLoginModal} contentLabel="Modal" overlayClassName="modal-overlay" className="modal-content">
          <LoginModal login={loginAction} />
        </ReactModal>
      </main>
    );
  }
}

HomeContainer.propTypes = {
  featuredProperties: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
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
  })).isRequired,
  recommendedProperties: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    encodedUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: ImmutablePropTypes.list.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  priceTypes: ImmutablePropTypes.contains({
    type: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  searchType: PropTypes.string.isRequired,
  loginModalOpen: PropTypes.bool.isRequired,
  updateLoginModalIsOpen: PropTypes.func.isRequired,
  changeSearchField: PropTypes.func.isRequired,
  onSearchProperty: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  featuredProperties: state.getIn(['properties', 'featured']),
  recommendedProperties: state.getIn(['properties', 'recommended']),
  loginModalOpen: state.getIn(['layout', 'loginModalOpen']),
  priceTypes: state.getIn(['search', 'priceTypes']),
  searchType: state.getIn(['search', 'fields', 'type']),
});

const functions = {
  updateLoginModalIsOpen,
  changeSearchField,
  onSearchProperty,
  loginAction: login,
};

export default connect(mapStateToProps, functions)(HomeContainer);
