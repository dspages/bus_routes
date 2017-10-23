import React from 'react';
import { indexStops, readStop } from '../util/api_util.js';
import { Link } from 'react-router-dom';
import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class BusStops extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stopSearchInput: "",
      stops: {},
      listItems: "",
      selectedStop: null
    };
    this.setStops = this.setStops.bind(this);
    this.changeStopSearch = this.changeStopSearch.bind(this);
    this.updateStops = this.updateStops.bind(this);
    this.clickStop = this.clickStop.bind(this);
  }

  setStops(stops){
    stops = $.map(stops, (value, index) => {
      return value;
    });
    this.setState({stops: stops});
  }

  clickStop(event){
    readStop(event.target.value).then((stop) => {
      this.setState({selectedStop: stop});
    });
  }

  componentDidMount(){
    indexStops().then(
      (stops) => {
        setTimeout(this.updateStops,0);
        this.setStops(stops);
      }
    );
  }

  updateStops(){
    let searchInput = this.state.stopSearchInput.toLowerCase();
    let count = 0;
    let items = this.state.stops.filter((cur,idx) => {
      let name = cur.on_street + " at " + cur.cross_street;
      if(name.toLowerCase().indexOf(searchInput) !== -1 && count < 200){
        count++;
        return true;
      }else{
        return false;
      }
    });
    let components = items.map((cur,idx) => {
      return <li
        className="stop"
        value={cur.id}
        onClick={this.clickStop}
        key={idx}>{cur.on_street} at {cur.cross_street}</li>;
    });
    //console.log(items);
    this.setState({listItems: components});
  }

  changeStopSearch(event){
    this.setState({stopSearchInput: event.target.value});
    window.setTimeout(this.updateStops,0);
  }

  render(){
    let routeCount = "N/A";
    if (this.state.selectedStop){
      console.log(this.state.selectedStop);
      routeCount = this.state.selectedStop.routes.length;
    }
    let items = this.state.listItems;
    return (
      <div>
          <div className="input-box">
            <p className="box-item">Type a stop street:</p>
            <input className="box-item" value={this.state.inputVal} onChange={this.changeStopSearch}></input>
            <p className="box-item">Number of routes for selected stop:</p>
            <p className="box-item">{routeCount}</p>
            <Link className="box-item" to={`/routes/`}>Go to Routes</Link>
          </div>
          <div className="item-box">
            <ul>
              {items}
            </ul>
          </div>
      </div>
    );
  }

}

export default BusStops;
