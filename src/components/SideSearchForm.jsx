import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SideSearchForm extends PureComponent {
  render() {
    const {
      searchPrice,
      searchType,
      searchProperty,
      changeSearchField,
      priceListItem,
    } = this.props;

    return (
      <form className="search-form" onSubmit={this.props.onSearchProperty}>
        <h4><span className="glyphicon glyphicon-search" /> Search for</h4>
        <input type="text" className="form-control" placeholder="Search of Properties" />
        <div className="row">
          <div className="col-lg-5">
            <select className="form-control type" value={searchType} onChange={e => changeSearchField('type', e.target.value)}>
              <option value="1">Buy</option>
              <option value="2">Rent</option>
              <option value="3">Sale</option>
            </select>
          </div>
          <div className="col-lg-7">onSearchProperty
            <select className="form-control price" value={searchPrice} onChange={e => changeSearchField('price', e.target.value)}>
              <option>Price</option>
              {!!priceListItem.get('list') && priceListItem.get('list').map(item => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <select className="form-control property" value={searchProperty} onChange={e => this.props.changeSearchField('property', e.target.value)}>
              <option value="">Property Type</option>
              <option value="1">Apartment</option>
              <option value="2">Building</option>
              <option value="3">Office Space</option>
            </select>
          </div>
        </div>
        <input type="submit" className="btn btn-primary" value="Find Now" />
      </form>
    );
  }
}

SideSearchForm.propTypes = {
  searchPrice: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  searchProperty: PropTypes.string.isRequired,
  priceListItem: PropTypes.shape({
    type: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onSearchProperty: PropTypes.func.isRequired,
  changeSearchField: PropTypes.func.isRequired,
};

export default SideSearchForm;
