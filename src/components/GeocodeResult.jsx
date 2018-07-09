import React from 'react';
import PropTypes from 'prop-types';

const GeocodeResult = ({ address, location }) => (
  <ul className="getcode-result">
    <li>住所：{address}</li>
    <li>緯度：{location.lat}</li>
    <li>国籍：{location.lng}</li>
  </ul>
);

GeocodeResult.propTypes = {
  address: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

GeocodeResult.defaultProps = {
  address: '',
  location: { lat: 0, lng: 0, },
//  lat: 0,
//  lng: 0,
};

export default GeocodeResult;
