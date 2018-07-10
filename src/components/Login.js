import React from "react";

class Login extends React.Component{

	nameRef = React.createRef();
	emailRef = React.createRef();
	telRef = React.createRef();

	loginHandler = (event) => {
		const time = new Date();
		event.preventDefault();
		const userDetail = {
			uid: time.toLocaleTimeString(),
			displayName: this.nameRef.current.value,
			email: this.emailRef.current.value,
			phoneNumber: this.telRef.current.value
		}
		this.props.authenticate(userDetail);
	}

	testHandler = () => {
		var userTest = { uid: 'test', displayName: 'test', email: 'test', phoneNumber: 'test' };
		this.props.authenticate(userTest)
	}

	render() {


		return (
			<div className="login-session">
				<nav className="login">
					<h2>Order</h2>
					<p>Sign in to Order with your Facebook account.</p>
					{/*<button className="github" onClick={() => this.props.authenticate('Github')}>
					Log In With GitHub
					</button>*/}
					<button className="facebook" onClick={() => this.props.authenticate('Facebook')}>
					Log In With Facebook
					</button>
				</nav>
				<p>Or Register:</p>
				<form className="register_form" onSubmit={this.loginHandler}>
					<input className="register_form-name" type="text" name="name" ref={this.nameRef} required autoComplete="name" placeholder="Name:"/>
					<input className="register_form-email" type="email" name="email" ref={this.emailRef} required autoComplete="email" placeholder="Email:"/>
					<input className="register_form-tel" type="tel" name="tel" ref={this.telRef} required autoComplete="tel" placeholder="Phone Number:"/>
					<button type="submit">Register</button>
				</form>
				<p>Or just for testing purposes</p>
				<button className='test-btn' onClick={this.testHandler}>TEST</button>
			</div>
		)
	}
}

export default Login;