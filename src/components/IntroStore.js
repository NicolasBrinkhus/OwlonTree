import React from "react";

class IntroStore extends React.Component {
	myInput = React.createRef();

	goToStore = (event) => {
		// 1. prevent event to submitting!!
		event.preventDefault();
		// 2. get the name of the store
		const storeName = this.myInput.current.value;
		// 3. change the page to /store/whatever-they-entered
		this.props.history.push(`/store/${storeName}/`);
	}

	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter The Store</h2>
				<input 
					type="text"
					ref={this.myInput} 
					required 
					defaultValue={"Owl-in-the-Tree"} 
				/>
				<button type="submit">Visit Store</button>
			</form>
		)
	}
}

export default IntroStore;