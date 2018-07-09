import React, { Component, PropTypes } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: '東京タワー',
    };
  }

  handlePlaceChange(place) {
    this.setState({ place });
    console.log(place);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.place);
  }

  render() {
    return (
      <form className="search-form" onSubmit={e => this.handleSubmit(e)}>
        <input
          className="place-input"
          type="text"
          size="30"
          value={this.state.place}
          onChange={e => this.handlePlaceChange(e.target.value)}
        />
        <input className="submit-button" type="submit" value="検索" />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
