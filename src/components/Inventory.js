import React from "react";
import base from "../base";

class Inventory extends React.Component {
	postHandler = async () => {
		await base.post(`${this.props.storeId}:MENU/menu`, {
			data: this.props.meals
		});
	}

	render() {
		return (
			<div>
				<h2>Inventory</h2>
				<button onClick={this.postHandler}>Post Meals to the Database</button>
			</div>
		)
	}
}

export default Inventory;