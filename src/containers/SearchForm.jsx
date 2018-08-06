import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getcode } from '../domain/Geocoder';
// import { searchHotelByLocation } from '../domain/HotelRepository';

const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit(props.place);
    }}
  >
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.onPlaceChange(e.target.value);
      }}
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  place: state.place,
});

const mapDispatchToProps = dispatch => ({
  onPlaceChange: place => dispatch({ type: 'CHANGE_PLACE', place }),
  onSubmit: (place) => {
    getcode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            dispatch({ type: 'GEOCODE_FETCHED', address, location });
            // return searchHotelByLocation(location);
            break;
          }
          case 'ZERO_RESULTS': {
            // this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          default: {
            // this.setErrorMessage('エラーが発生しました');
            break;
          }
        }
        return [];
      });
    // .then((hotels) => {
    //   this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
    // })
    // .catch((error) => {
    //   console.log(error);
    //   this.setErrorMessage('通信に失敗しました');
    // });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
