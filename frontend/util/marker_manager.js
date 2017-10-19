
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
    //console.log(loc);
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
    //console.log(route);
    for (var j = 0; j < route.stops.length; j++) {
      //console.log(route.stops[i]);
      let coords = this.parseCoords(route.stops[j].location);
      this.markers.push(this.createMarker(coords[0], coords[1]));
    }
    //console.log("update runs");
  }

}

export default MarkerManager;
