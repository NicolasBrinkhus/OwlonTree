import React from 'react';
import base from '../base';

class Address extends React.Component {
goToStore = event => {
	event.preventDefault();
	const placeId = this.props.locations.place_id;
	const user = {};
	// AO CLICAR, PEGA-SE OS DADOS ALTERADOS PELO USER E ARMAZENA NO BANCO DE DADOS DO FIREBASE
	Object.keys(this.refs).map(key => {
		user[key] = this.refs[key].value;
	});
	if (placeId) {
		base.post(`User:Custom/PlaceId:${placeId}`, {
			data: user
		});
	}
	this.props.history.push(`/store/Owl-in-the-Tree/`);
}

	render() {
		if (this.props.locations.address_components) {
			const location = this.props.locations.address_components;

			return (
				<div className="popup" id="address">
					<div className="popup__content">
					<div className="popup__content-address">
							<h2>Confirm Address</h2>
							<form className="popup__content-address--form" onSubmit={this.goToStore}>
								{Object.keys(location).map(key => {
									if (key <= 3) {
										return (
											<div className={"popup__content-address--inputs"} key={key}>
												<p>{location[key].types[0]}:</p>
												<input 
													type="text" 
													ref={location[key].types[0]}
													required 
													autoComplete={location[key].types[0]} 
													defaultValue={location[key].long_name} 
												/>
												<span>&#10004;</span>
											</div>
										)
									} else { return null }
								})}
								<textarea 
									name="Desc" 
									ref={"description"}
									placeholder="Place here instructions for our delivery driver..." 
									cols="30" 
									rows="6">
								</textarea>
								<button type="submit">Confirm Address</button>
							</form>
						</div>
					</div>
				</div>
			)
		}
		return null
	}
}

export default Address;