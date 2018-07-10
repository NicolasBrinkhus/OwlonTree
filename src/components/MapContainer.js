import React from 'react';
import ReactDOM from 'react-dom';


class MapContainer extends React.Component {

  componentDidMount() {
    this.loadMap(); // call loadMap function to load the google map
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      var mapConfig = Object.assign({}, {
        center: {lat: 53.350888, lng: -6.259444}, // sets center of google map to Dublin 53.350888, -6.259444.
        zoom: 12, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })
      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      var map = this.map;

      var bounds = this.props.locations;
      var marker = new google.maps.Marker({ // creates a new Google maps Marker object.
        position: {lat: bounds.location.lat, lng: bounds.location.lng}, // sets position of marker to specified location
        map: this.map, // sets markers to appear on the map we just created on line 35
        title: bounds.name, // the title of the marker is set to the name of the location
        animation: google.maps.Animation.DROP
      });

      console.log(bounds);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: bounds.location}, (results, status) => {
        if (status === 'OK') {
          console.log(results[0])
          this.props.updateState(results[0]);
        }
      })
    }
    // COMO ATUALIZAR O STATE PARA SEMPRE PEGAR A LOCATION DO CENTRO.
    map.addListener('center_changed', () => {
    	// set marker position
    	marker.setPosition(map.center)
	  })
	  map.addListener('dragend', () => {
    	// get position and details from the center every time it moves.A
    	bounds.location = map.center;
			geocoder.geocode({ location: bounds.location}, (results, status) => {
    		if (status === 'OK') {
          console.log(results[0])
    			this.props.updateState(results[0]);
    		}
    	})
	  })
	  //AO CLICAR NO BOTÃO, PEGAR A LOCATION DO MARKER COM DETAILS E NEXT PAGE.
	}


  render() {

    return ( // in our return function you must return a div with ref='map' and style.
    	<div className="deliver_content-map" ref="map">
    		loading map ... 
    	</div>
    )
  }
}

export default MapContainer;