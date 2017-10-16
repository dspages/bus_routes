import React from 'react';
import { indexRoutes, readRoute } from '../util/api_util.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    readRoute(5).then(
      (routes) => {console.log(routes);}
    );
  }

  render() {
    return (
      <p>Hello World</p>
    );
  }

}

export default App;
