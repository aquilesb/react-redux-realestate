import React from 'react';
import { PropTypes } from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { format2Money } from '@/core/Helpers/formatHelper';

const PropertyRecommended = ({ item }) => (
  <div className="item active">
    <div className="row">
      <div className="col-lg-4">
        <img src={item.getIn(['images', 0])} className="img-responsive" alt="properties" />
      </div>
      <div className="col-lg-8">
        <h5><Link to={`/property/${item.get('encodedUrl')}`}>{item.get('name')}</Link></h5>
        <p className="price">{format2Money(item.get('price'))}</p>
        <Link to={`/property/${item.get('encodedUrl')}`} className="more">More Detail</Link>
      </div>
    </div>
  </div>
);

PropertyRecommended.propTypes = {
  item: ImmutablePropTypes.contains({
    encodedUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: ImmutablePropTypes.list.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default PropertyRecommended;
