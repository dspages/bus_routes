import React from 'react';
import MarkerManager from '../util/marker_manager.js';
import { STYLE } from '../util/map_style.js';

class Map extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 41.88, lng: -87.80 }, //Chicago
      zoom: 10,
      styles: STYLE
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
