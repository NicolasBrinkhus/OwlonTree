import React from 'react';

class EditMealForm extends React.Component {
	handleChange = event => {
		//update that meal
		// 1. take a copy of the current meal
		const updatedMeal = { 
			...this.props.meal,
			[event.currentTarget.name]: event.currentTarget.value
		}
		this.props.updateMeal(this.props.index, updatedMeal);
	}
	render() {
		return (
			<div className="meal-edit">
				<input type="text" name="name" onChange={this.handleChange} value={this.props.meal.name} />
				<input type="text" name="price" onChange={this.handleChange} value={this.props.meal.price} />
				<select type="text" name="status" onChange={this.handleChange} value={this.props.meal.status}>
					<option value="available">Available!</option>
					<option value="unavailable">Unavailable!</option>
				</select>
				<textarea name="desc" onChange={this.handleChange} value={this.props.meal.desc}></textarea>
				<input type="text" name="image" onChange={this.handleChange} value={this.props.meal.image} />
				<button onClick={() => {console.log(this.props.deleteMeal(this.props.index))}}>Remove Meal</button>
			</div>
		)
	}
}

export default EditMealForm;