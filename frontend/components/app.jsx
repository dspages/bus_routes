import React from 'react';
import { indexRoutes, readRoute } from '../util/api_util.js';
import { PUBLIC_API_KEY } from '../util/misc_util.js';
import Map from './map';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {routeSearchInput: "", routes: {}, listItems: "", selectedRoute: null};
    this.setRoutes = this.setRoutes.bind(this);
    this.changeRouteSearch = this.changeRouteSearch.bind(this);
    this.updateRoutes = this.updateRoutes.bind(this);
    this.clickRoute = this.clickRoute.bind(this);
  }

  clickRoute(event){
    readRoute(event.target.value).then((route) => {
      this.setState({selectedRoute: route});
      //console.log(route);
    });
  }

  setRoutes(routes){
    routes = $.map(routes, (value,index) => {
      return value;
    });
    this.setState({routes: routes});
  }

  updateRoutes(){
    let searchInput = this.state.routeSearchInput.toLowerCase();
    let count = 0;
    let items = this.state.routes.filter((cur,idx) => {
      if(cur.route_name.toLowerCase().indexOf(searchInput) !== -1 && count < 200){
        count++;
        return true;
      }else{
        return false;
      }
    });
    let components = items.map((cur,idx) =>{
      return <li className="route" value={cur.id} onClick={this.clickRoute} key={idx}>{cur.route_name}</li>;
    });
    //console.log(items);
    this.setState({listItems: components});
  }

  changeRouteSearch(event){
    this.setState({routeSearchInput: event.target.value});
    window.setTimeout(this.updateRoutes,0);
  }

  componentDidMount(){
    indexRoutes().then(
      (routes) => this.setRoutes(routes)
    );
  }

  render() {
    let items = this.state.listItems;
    return (
      <div>
        <div className="input-box">
          <p>Type a route number here:</p>
          <input value={this.state.inputVal} onChange={this.changeRouteSearch}></input>
        </div>
        <div className="route-box">
          <ul>
            {items}
          </ul>
          <div>
            <Map route={this.state.selectedRoute}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
