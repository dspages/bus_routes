import React from 'react';
import { indexRoutes, readRoute } from '../util/api_util.js';
import { Link } from 'react-router-dom';
import { PUBLIC_API_KEY } from '../util/misc_util.js';
import Map from './map';

class BusRoutes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routeSearchInput: "",
      routes: {},
      listItems: "",
      selectedRoute: null
    };
    this.setRoutes = this.setRoutes.bind(this);
    this.changeRouteSearch = this.changeRouteSearch.bind(this);
    this.updateRoutes = this.updateRoutes.bind(this);
    this.clickRoute = this.clickRoute.bind(this);
  }

  clickRoute(event){
    readRoute(event.target.value).then((route) => {
      this.setState({selectedRoute: route});
    });
  }

  setRoutes(routes){
    routes = $.map(routes, (value, index) => {
      return value;
    });
    this.setState({routes: routes});
  }

  updateRoutes(){
    let searchInput = this.state.routeSearchInput.toLowerCase();
    let count = 0;
    let items = this.state.routes.filter((cur,idx) => {
      if(cur.route_name.toLowerCase().indexOf(searchInput) !== -1){
        return true;
      }else{
        return false;
      }
    });
    let components = items.map((cur,idx) => {
      return <li className="route" value={cur.id} onClick={this.clickRoute} key={idx}>{cur.route_name}</li>;
    });
    this.setState({listItems: components});
  }

  changeRouteSearch(event){
    this.setState({routeSearchInput: event.target.value});
    window.setTimeout(this.updateRoutes,0);
  }

  componentDidMount(){
    indexRoutes().then(
      (routes) => {
        setTimeout(this.updateRoutes,0);
        this.setRoutes(routes);
      }
    );
  }

  render() {
    let stopCount = "N/A";
    if (this.state.selectedRoute){
      stopCount = this.state.selectedRoute.stops.length;
    }
    let items = this.state.listItems;
    return (
      <div>
        <div className="input-box">
          <p className="box-item">Type a route number here:</p>
          <input className="box-item" value={this.state.inputVal} onChange={this.changeRouteSearch}></input>
          <p className="box-item">Number of stops for selected route:</p>
          <p className="box-item">{stopCount}</p>
          <Link className="box-item" to={`/stops/`}>Visit Stops Page</Link>
        </div>
        <div className="item-box">
          <ul className="left-list route-list">
            {items}
          </ul>
          <Map route={this.state.selectedRoute}/>
        </div>
      </div>
    );
  }

}

export default BusRoutes;
