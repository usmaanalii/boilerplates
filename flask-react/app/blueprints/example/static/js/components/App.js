import React from 'react';

class App extends React.Component {
  state = { colour: 'red' };

  render() {
    return <h1 style={{ color: this.state.colour }}>Hello</h1>;
  }
}

export default App;
