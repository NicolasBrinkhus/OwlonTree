import React from "react";
import firebase from "firebase";
import AddMealsForm from "./AddMealsForm";
import EditMealForm from "./EditMealForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {

	state = {
		uid: null,
		owner: null
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {

			if (user) {
				this.authHandler({ user });
			}
		});
	}

	authHandler = async (authData) => {
		// 1. look up	the current store in the firebase database
		const store = await base.fetch(this.props.storeId, { context: this });
		// 2. claim it if there is no owner
		if (!store.owner) {
			//save it as our own
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid
			});
		}
		// 3. set the state of the inventory component to reflect the current user
		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid
		});
	};

	authenticate = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
	};

	logout = async () => {
		await firebase.auth().signOut();
		this.setState({ uid: null });
	}

	render() {
		const logout = <button onClick={this.logout}>Log Out!</button>
		// 1. check if they are loging in
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}
		// 2. check if they are not the owner of the store
		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry you are not the owner</p>
					{logout}
				</div>
			);
		} 
		// 3. they must be the owner, just render the inventory
		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{logout}
				{Object.keys(this.props.meals).map(key => (
					<EditMealForm 
						key={key} 
						index={key}
						meal={this.props.meals[key]} 
						updateMeal={this.props.updateMeal}
						deleteMeal={this.props.deleteMeal}
					/>
				))}
				<AddMealsForm addMeals={this.props.addMeals} />
				<button onClick={this.props.loadSampleMeals}>Load Sample Meals</button>
			</div>
		)
	}
}

export default Inventory;