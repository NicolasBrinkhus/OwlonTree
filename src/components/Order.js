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
		email: null,
		tel: null
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
			email: authData.user.email,
			tel: authData.user.phoneNumber
		};
		// 1. look up	the current store in the firebase database
		const store = await base.fetch(`${this.props.storeId}:${authData.user.displayName}`, { context: this });
		// 2. claim it if there is no user
		if (!store.user) {
			//save it as our own
			await base.post(`${this.props.storeId}:${authData.user.displayName}/user`, {
				data: userInfo
			});
		} else {
			console.log(store.user);
		}
		// 3. set the state of the inventory component to reflect the current user
		this.setState({ ...userInfo });
	};

	authenticate = provider => {
		// 1. check if provider is github, facebook or email
		if (typeof provider === 'object') {
			// Prover os dados do user: uid, name, email, phone.
			this.authHandler({user: provider});
		} else {
			const authProvider = new firebase.auth[`${provider}AuthProvider`]();
			console.log(authProvider);
			firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
		}
	};

	logout = async () => {
		await firebase.auth().signOut();
		this.setState({ uid: null, email: null, name: null, tel: null, order: null });
		localStorage.removeItem(this.props.storeId);
	}
	renderOrder = key => {
		const meal = this.props.meals[key];
		const count = this.props.order[key];
		const isAvailable = meal && meal.status === 'available';
		//make sure the meal is loaded before cont.
		if (!meal) return null;

		if (!isAvailable) {
			setTimeout(() => {
				console.log(key);
				this.props.removeFromOrder(key);
			}, 2000)
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
		)
	};

	checkOutHandler = async () => {
		const date = new Date();
		const dados = {
			name: this.state.name,
			email: this.state.email,
			uid: this.state.uid,
			order: this.props.order,
			tel: this.props.tel
		}
		//ao publicar no heroku = https://shrouded-island-24290.herokuapp.com/
		// 1. Enviar os dados para o server, para então enviar por email
		fetch('http://localhost:3000/', {
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				data: dados
			})
		})
		// 3. display mensagem de compra.
		.then(response => response.json())
		.then(data => {
			if (data === 'success') {
				console.log('Thank you for purchase!');
			}
		})
		// 2. Enviar os dados para banco de dados, com a order e horario
		await base.post(`${this.props.storeId}:${this.state.name}/user/order:${date}`, {
			data: this.props.order
		})
	};

	render() {
		const logout = <button className="btn--logout" onClick={this.logout}>Log Out!</button>
		// 1. check if they are loging in
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} storeId={this.props.storeId} />;
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
				<a href="#popup">
					<button 
						className="btn--checkout"
						disabled={Object.keys(this.props.order).length === 0}
						onClick={this.checkOutHandler}>
						CheckOut
					</button>
				</a>
				<div className="popup" id="popup">
					<div className="popup__content">
						<h2 className="popup__content--header">Thank You for Purchase!!!</h2>
						<span className="popup__content--text">
							<p>Dear {this.state.name},</p>
							<p>
								Thank you for visiting us and making your purchase! 
								It is our goal that you are always happy with what you bought 
								from us, so please let us know if your buying experience was 
								anything short of excellent. One of our colleagues will get back 
								to you shortly. Have a great day!
							</p>
						</span>
						<a href="">
							<button onClick={this.logout}>OK</button>
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Order;