import React, { Component } from 'react';
import Greeting from './greeting';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Machida',
    };
  }

  handleNameChange(name) {
    console.log(name);
    this.setState({ name: name});
  }

  render() {
    return (
            <div>
                <input 
                    type="text"
                    value={this.state.name}
                    onChange={e => this.handleNameChange(e.target.value)} 
                />
                <button onClick={() => this.handleNameChange('Bob')}>I am Bob</button>
                <Greeting name={this.state.name} />
            </div>
        );
    }
}

export default App;
