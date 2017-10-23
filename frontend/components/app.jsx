import { Route, Switch, HashRouter} from 'react-router-dom';
import React from 'react';
import BusRoutes from './bus_routes';
import BusStops from './bus_stops';

const App = () => (
  <div className="main">
    <HashRouter>
      <Switch>
        <Route path="/routes/" component={BusRoutes} />
        <Route path="/stops/" component={BusStops} />
        <Route path="/" component={BusRoutes} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
