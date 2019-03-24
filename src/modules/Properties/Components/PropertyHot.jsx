import React from 'react';
import { PropTypes } from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { format2Money } from '@/core/Helpers/formatHelper';

const PropertyHot = ({ item }) => (
  <div className="row">
    <div className="col-lg-4 col-sm-5">
      <img src={item.getIn(['images', 0])} className="img-responsive img-circle" alt="properties" />
    </div>
    <div className="col-lg-8 col-sm-7">
      <h5><Link className="link-name" to={`/property/${item.get('encodedUrl')}`}>{item.get('name')}</Link></h5>
      <p className="price">${format2Money(item.get('price'))}</p>
    </div>
  </div>
);

PropertyHot.propTypes = {
  item: ImmutablePropTypes.contains({
    encodedUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: ImmutablePropTypes.list.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default PropertyHot;
