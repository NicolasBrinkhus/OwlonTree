import React from "react";
import firebase from "firebase";
import Login from "./Login";
import base, { firebaseApp } from "../base";
import { formatPrice }from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";


class Order extends React.Component {

	state = {
		uid: null,
		name: null,
		email: null
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.authHandler({ user });
			}
		});
	}

	authHandler = async (authData) => {
		const userInfo = {
			uid: authData.user.uid,
			name: authData.user.displayName,
			email: authData.user.email
		};
		// 1. look up	the current store in the firebase database
		const store = await base.fetch(`${this.props.storeId}:${authData.user.displayName}`, { context: this });
		// 2. claim it if there is no user
		if (!store.user) {
			//save it as our own
			await base.post(`${this.props.storeId}:${authData.user.displayName}/user`, {
				data: userInfo
			});
		}
		// 3. set the state of the inventory component to reflect the current user
		this.setState({ ...userInfo });
	};

	authenticate = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
	};

	logout = async () => {
		await firebase.auth().signOut();
		this.setState({ uid: null, email: null, name: null });
	}
	renderOrder = key => {
		const meal = this.props.meals[key];
		const count = this.props.order[key];
		const isAvailable = meal && meal.status === 'available';
		//make sure the meal is loaded before cont.
		if (!meal) return null;

		if (!isAvailable) {
			return (
				<CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
					<li key={key}>Sorry {meal ? meal.name : 'meal'} is no longer available!</li>
				</CSSTransition>
			)
		}
		return (
			<CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
				<li key={key}>
					<span>
						<TransitionGroup component="span" className='count'>
							<CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
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

	checkOutHandler = async () => {
		const date = new Date();
		await base.post(`${this.props.storeId}:${this.state.name}/user/order:${date}`, {
			data: this.props.order
		});
	};

	render() {
		const logout = <button onClick={this.logout}>Log Out!</button>
		// 1. check if they are loging in
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		} 
		// 3. they must be the owner, just display the orders
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
				{logout}
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					Total:
					<strong>{formatPrice(total)}</strong>
				</div>
				<button onClick={this.checkOutHandler}>CheckOut</button>
			</div>
		)
	}
}

export default Order;