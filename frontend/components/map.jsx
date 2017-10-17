import React from 'react';
import MarkerManager from '../util/marker_manager.js';

class Map extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 41.8781, lng: -87.6298 }, //Chicago
      zoom: 9
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.markerManager = new MarkerManager(this.map);
    this.markerManager.updateMarkers(this.props.route);
  }

  render() {
    if(this.markerManager){
      this.markerManager.updateMarkers(this.props.route);
    }
    return (
      <div>
        <div id="map" ref={ map => this.mapNode = map }/>
      </div>
    );
  }

}

export default Map;
