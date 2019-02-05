import React, { Component } from 'react';
import './App.css';
import InfiniteImageGrid from './components/InfiniteImageGrid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InfiniteImageGrid/>
      </div>
    );
  }
}

export default App;
