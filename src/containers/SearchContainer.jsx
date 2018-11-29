import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import InsideBanner from '../components/InsideBanner';
import PropertyListItem from '../components/PropertyListItem';
import PropertyHot from '../components/PropertyHot';
import SideSearchForm from '../components/SideSearchForm';
import { changeSearchField, changeSortBy } from '../actions/searchActions';
import { onSearchProperty, doInifiteSearch } from '../actions/propertieActions';


class SearchContainer extends PureComponent {
  render() {
    const {
      searched,
      searchType,
      priceTypes,
      searchPrice,
      searchProperty,
      hotProps,
      sortBy,
      totalResults,
      hasMore2Load,
    } = this.props;

    const priceListItem = priceTypes.find(item => item.get('type') === searchType);

    const loader = <div className="loader" key={0}>Loading ...</div>;

    return (
      <main className="search" >
        <InsideBanner title="Search" />
        <section className="container">
          <div className="properties-listing spacer">
            <div className="row">
              <div className="col-lg-3 col-sm-4 ">
                <SideSearchForm
                  priceListItem={priceListItem}
                  searchPrice={searchPrice}
                  searchType={searchType}
                  searchProperty={searchProperty}
                  onSearchProperty={this.props.onSearchProperty}
                  changeSearchField={this.props.changeSearchField}
                />
                <div className="hot-properties hidden-xs">
                  <h4>Hot Properties</h4>
                  { hotProps.size > 0 && hotProps.map(item => <PropertyHot item={item} key={item.get('id')} />)}
                </div>
              </div>
              <div className="col-lg-9 col-sm-8">
                <div className="sortby-wrapper">
                  <div className="align-left result">Showing: {searched.size} of {totalResults} </div>
                  <div className="align-right">
                    <h6>Sort by:</h6>
                    <select className="form-control" value={sortBy} onChange={this.props.changeSortBy}>
                      <option value="1">Price: Low to High</option>
                      <option value="2">Price: High to Low</option>
                    </select>
                  </div>
                </div>
                <div className="row search-result">
                  <InfiniteScroll
                    id="infinite-scroll"
                    pageStart={0}
                    loadMore={this.props.doInifiteSearch}
                    hasMore={hasMore2Load}
                    loader={loader}
                  >
                    { !!searched > 0 && searched.map((item, index) =>
                    /* TODO remove time when create backend unique IDs */
                      (
                        <div className="col-lg-4 col-sm-6" key={`container-${item.get('id')}-${index}`}>
                          <PropertyListItem item={item} key={item.get('id')} />
                        </div>
                      )) }
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main >
    );
  }
}

SearchContainer.propTypes = {
  searched: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
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
  hotProps: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
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
  searchPrice: PropTypes.string.isRequired,
  searchProperty: PropTypes.string.isRequired,
  sortBy: PropTypes.number.isRequired,
  hasMore2Load: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  changeSearchField: PropTypes.func.isRequired,
  onSearchProperty: PropTypes.func.isRequired,
  changeSortBy: PropTypes.func.isRequired,
  doInifiteSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const searchedProps = state.getIn(['properties', 'searched']);
  let searched;
  let totalResults;
  let hasMore2Load;

  if (searchedProps && searchedProps.size) {
    searched = searchedProps;
    totalResults = state.getIn(['search', 'totalResults']);
    hasMore2Load = state.getIn(['search', 'totalResults']) > state.getIn(['search', 'totalLoaded']);
  } else {
    searched = state.getIn(['properties', 'featured']);
    totalResults = searched.size;
    hasMore2Load = false;
  }
  return {
    searched,
    hotProps: state.getIn(['properties', 'hot']),
    priceTypes: state.getIn(['search', 'priceTypes']),
    searchType: state.getIn(['search', 'fields', 'type']),
    searchPrice: state.getIn(['search', 'fields', 'price']),
    searchProperty: state.getIn(['search', 'fields', 'property']),
    sortBy: state.getIn(['search', 'sortBy']),
    hasMore2Load,
    totalResults,
  };
};

const functions = {
  changeSearchField,
  onSearchProperty,
  changeSortBy,
  doInifiteSearch,
};

export default connect(mapStateToProps, functions)(SearchContainer);
