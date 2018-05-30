import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleMeals from "../sample-meals";
import Meal from "./Meal";
import base from "../base";

class App extends React.Component {
	state = {
		meals: {},
		order: {}
	};

	componentDidMount() {
		// first reinstate our localstorage
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${this.props.match.params.storeId}/meals`, {
			context: this,
			state: 'meals'
		});
	};

	componentDidUpdate() {
		console.log(this.state.order);
		localStorage.setItem(this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		);
	};

	componentWillUnmount() {
		base.removeBinding(this.ref);
	};

	addMeals = meal => {
		const meals = { ...this.state.meals };
		meals[`meal${Date.now()}`] = meal;
		this.setState({
			meals: meals
		});
	};

	updateMeal = (key, updatedMeal) => {
		const meals = { ...this.state.meals };
		meals[key] = updatedMeal;
		this.setState({ meals: meals});
	};

	deleteMeal = key => {
		const meals = { ...this.state.meals };
		meals[key] = null;
		this.setState({ meals });
	};

	addToOrder = key => {
		const order = { ...this.state.order };
		order[key] = order[key] + 1 || 1;
		this.setState({ order: order });
	};

	removeFromOrder = key => {
		const order = { ...this.state.order };
		delete order[key];
		this.setState({ order });
	};

	loadSampleMeals = () => {
		this.setState({ meals: sampleMeals });
	}

	render() {
		return (
			<div className="owl-in-the-tree">
				<div className="menu">
					<Header tagline="Healthy Food Market" />
					<ul className="meals">
						{Object.keys(this.state.meals).map(key =>( 
							<Meal 
								key={key} 
								index={key}
								details={this.state.meals[key]} 
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order 
					meals={this.state.meals} 
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
					addMeals={this.addMeals} 
					updateMeal={this.updateMeal}
					deleteMeal={this.deleteMeal}
					loadSampleMeals={this.loadSampleMeals} 
					meals={this.state.meals}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		)
	}
}

export default App;