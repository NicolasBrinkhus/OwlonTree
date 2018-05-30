import React from "react";

class AddMealsForm extends React.Component {
nameRef = React.createRef();
priceRef = React.createRef();
statusRef = React.createRef();
descRef = React.createRef();
imageRef = React.createRef();

	createMeal = (event) => {
		// 1. stop from submitting
		event.preventDefault();
		const meal = {
			name:	this.nameRef.current.value,
			price:	parseFloat(this.priceRef.current.value),
			status:	this.statusRef.current.value,
			desc:	this.descRef.current.value,
			image:	this.imageRef.current.value
		}
		this.props.addMeals(meal);
		// refresh form
		event.currentTarget.reset();
	}

	render() {
		return (
			<form className="meal-edit" onSubmit={this.createMeal}>
			<input name="name" ref={this.nameRef} type="text" placeholder="Name" />
			<input name="price" ref={this.priceRef} type="text" placeholder="Price" />
			<select name="status" ref={this.statusRef} placeholder="Status">
				<option value="available">Available!</option>
				<option value="unavailable">Unavailable!</option>
			</select>
			<textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
			<input name="image" ref={this.imageRef} type="text" placeholder="Image" />
			<button type="submit">+ Add Meal</button>
			</form>
		)
	}
}

export default AddMealsForm;