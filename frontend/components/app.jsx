import { Route, Switch } from 'react-router-dom';
import BusRoutes from './bus_routes';
import BusStops from './bus_stops';

const App = () => (
  <div className="main">
    <Switch>
      <Route path="/routes/" component={BusRoutes} />
      <Route path="/stops/" component={BusStops} />
      <Route path="/" component={BusRoutes} />
    </Switch>
  </div>
);

export default App;
