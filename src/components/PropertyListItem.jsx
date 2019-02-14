import React from 'react';
import { PropTypes } from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { format2Money } from '../utils/formatUtils';

const PropertyListItem = ({ item }) => {
  const status = item.get('status') === 'sell' ? '' : item.get('status');
  return (
    <div className="properties-wrapper">
      <div className="properties">
        <div className="image-holder">
          <img src={item.getIn(['images', 0])} className="img-responsive" alt="properties" />
          <div className={`status ${item.get('status')}`}>{status}</div>
        </div>
        <h4><Link className="link-property" to={`/property/${item.get('encodedUrl')}`}>{item.get('name')}</Link></h4>
        <p className="price">Price: ${format2Money(item.get('price'))}</p>
        <div className="listing-detail">
          <span title="Bed Room" className="bedroom">{item.getIn(['features', 'bedroom'])}</span>
          <span title="Baths" className="bathroom">{item.getIn(['features', 'bathroom'])}</span>
          <span title="Parking" className="parking">{item.getIn(['features', 'parking'])}</span>
          <span title="Kitchen" className="kitchen">{item.getIn(['features', 'kitchen'])}</span>
        </div>
        <Link className="btn btn-primary" to={`/property/${item.get('encodedUrl')}`}>View Details</Link>
      </div>
    </div>
  );
};

PropertyListItem.propTypes = {
  item: ImmutablePropTypes.contains({
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
  }).isRequired,
};

export default PropertyListItem;
