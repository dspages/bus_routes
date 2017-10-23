import React from 'react';
import { indexStops, readStop } from '../util/api_util.js';
import { Link } from 'react-router-dom';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

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
      if(name.toLowerCase().indexOf(searchInput) !== -1){
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
    this.setState({listItems: components});
  }

  changeStopSearch(event){
    this.setState({stopSearchInput: event.target.value});
    window.setTimeout(this.updateStops,0);
  }

  render(){
    console.log(this.state.selectedStop);
    let routeCount = "N/A";
    if (this.state.selectedStop){
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
          <ul className="stop-list left-list">
            {items.length > 0 ? items : "Loading... this may take several seconds"}
          </ul>
          <div className="chart-box">
            {this.state.selectedStop ? <BarChart width={400} height={400} data={[this.state.selectedStop]}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="cross_street"/>
             <YAxis/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Legend layout="vertical"/>
             <Bar dataKey="boardings" fill="#aa2222" />
             <Bar dataKey="alightings" fill="#2222aa" />
            </BarChart> : null}
          </div>
        </div>
      </div>
    );
  }

}

export default BusStops;
