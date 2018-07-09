import React, { Component } from 'react';

import Map from './Map';
import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import HotelsTable from './HotelsTable';

import { getcode } from '../domain/Geocoder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 35.658505,
        lng: 139.7454329,
      },
      hotels: [
        { id: 111, name: 'オークラ' , url: 'http://www.hotelokura.co.jp/tokyo/' },
        { id: 222, name: 'アパホテル' , url: 'https://www.apa.co.jp/' },
      ],
    };
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

  handlePlaceSubmit(place) {
    getcode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            break;
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
      })
      .catch((error) => {
        console.log(error);
        this.setErrorMessage('通信に失敗しました');
      });
  }

  render() {
    return (
      <div className="app">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>ホテル検索結果</h2>
            <HotelsTable hotels={this.state.hotels} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
