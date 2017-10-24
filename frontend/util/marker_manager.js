
class MarkerManager {

  constructor(map){
    this.map = map;
    this.markers = [];
    this.stops = [];
  }

  createMarker(lat, lng) {
    var marker = new google.maps.Marker({
      position: { lat: parseFloat(lat), lng: parseFloat(lng) },
      map: this.map
    });
    return marker;
  }

  parseCoords(loc){
    loc = loc.replace("(", "");
    loc = loc.replace(")", "");
    return loc.split(", ");
  }

  updateMarkers(route) {
    if(!route){return;}
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    for (var j = 0; j < route.stops.length; j++) {
      let coords = this.parseCoords(route.stops[j].location);
      this.markers.push(this.createMarker(coords[0], coords[1]));
    }
  }

}

export default MarkerManager;
