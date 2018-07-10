import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './MapContainer';
import Address from './Address';

class Deliver extends React.Component {
  constructor(props) {
    super(props);

  	this.state = {
      locations: { 
      	name: "Center", 
      	location: {lat: 53.350888, lng: -6.259444}
      },
      updated: false
    }
    this.locationDidConfirm = null;
  } 
  
  confirmAddress = () => {
		// ao clicar pega location atual e joga na tela de confirmação de endereço, que contem
		// textarea com notas para o delivery
    this.setState({ locations: this.state.locations, updated: true })
    this.locationDidConfirm = <Address 
                                id="address" 
                                locations={this.state.locations}
                                history={this.props.history}
                              />
  }

  updateState = location => {
    // Atualiza o state locations para o atual location
    this.setState({ locations: location, updated: false });
	}

  render() {
    return (
      <div className="deliver_content">
        <h2 className="deliver_content-title"> Choose Delivery Location </h2>
        <MapContainer 
        	google={this.props.google} 
        	locations={this.state.locations} 
        	updateState={this.updateState} 
        />	 
        {(this.state.updated === true) ? this.locationDidConfirm : '' }
        <a href="#address">
        	<button className="delivery_content-btn" onClick={this.confirmAddress}>Confirm Address</button>
        </a>
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyARM7fQB_Jar4U5saBiSq6mPxVluPFEKAg',
})(Deliver)