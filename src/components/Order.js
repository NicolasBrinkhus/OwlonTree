import React from "react";
import { formatPrice }from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";


class Order extends React.Component {
	renderOrder = key => {
		const meal = this.props.meals[key];
		const count = this.props.order[key];
		const isAvailable = meal && meal.status === 'available';
		//make sure the meal is loaded before cont.
		if (!meal) return null;

		if (!isAvailable) {
			return (
				<CSSTransition classNames="order" key={key} timeout={{ enter: 500, exit: 500 }}>
					<li key={key}>Sorry {meal ? meal.name : 'meal'} is no longer available!</li>
				</CSSTransition>
			)
		}
		return (
			<CSSTransition classNames="order" key={key} timeout={{ enter: 500, exit: 500 }}>
				<li key={key}>
					<span>
						<TransitionGroup component="span" className='count'>
							<CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						lbs 
						{meal.name}
						{formatPrice(count * meal.price)}
						<button onClick={() => {this.props.removeFromOrder(key)}}>&times;</button>
					</span>
				</li>
			</CSSTransition>
		);
	};

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const meal = this.props.meals[key];
			const count = this.props.order[key];
			const isAvailable = meal && meal.status === 'available';
			if (isAvailable) {
				return prevTotal + (count * meal.price);
			}
			return prevTotal;
		}, 0);
		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					Total:
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		)
	}
}

export default Order;