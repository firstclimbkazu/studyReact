import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';
import Map from './Map';
import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import HotelsTable from './HotelsTable';
import userEnv from 'userEnv';
import { getcode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      place: this.getPlaceParam() || '東京タワー',
      location: {
        lat: 35.658505,
        lng: 139.7454329,
      },
      sortKey: 'price',
    };
  }

  componentDidMount() {
    // public/index.html設定のmapJsスクリプトタグを削除
    // APIキー設定のスクリプトタグを生成し設定したが、
    // index.html側にないとエラー発生する為、mapJs削除⇢再作成を実施。
    const rmTag = document.getElementById('mapJs');
    rmTag.remove();
    const mapScript = document.createElement('script');
    const MAP_SCRIPT = "https://maps.googleapis.com/maps/api/js?key=";
    mapScript.src = MAP_SCRIPT + userEnv.REACT_APP_MAP_DEV_API_KEY;
    mapScript.async = true;
    document.body.appendChild(mapScript);

    const place = this.getPlaceParam();
    if (place && place.length > 0) {
      this.startSearch(place);
    }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  handlePlaceChange(place) {
    this.setState({ place });
    console.log(place);
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch(this.state.place);
  }

  startSearch(place) {
    getcode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          default: {
            this.setErrorMessage('エラーが発生しました');
            break;
          }
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
      })
      .catch((error) => {
        console.log(error);
        this.setErrorMessage('通信に失敗しました');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm
          place={this.state.place}
          onPlaceChange={place => this.handlePlaceChange(place)}
          onSubmit={(e) => this.handlePlaceSubmit(e)}
        />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
};

export default SearchPage;
