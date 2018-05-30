import React from "react";
import { formatPrice } from "../helpers";

class Meal extends React.Component {
	render() {
		const { image, name, desc, price, status } = this.props.details;
		const isAvailable = status === "available";
		return (
			<li className="menu-meal">
				<img src={image} alt={name}/>
				<h3 className="meal-name">
					{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>{desc}</p>
				<button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{isAvailable ? 'Add to Cart' : 'Sold Out!'}</button>
			</li>
		)
	}
}

export default Meal;