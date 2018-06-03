import React from "react";

const Login = (props) => (
	<nav className="login">
		<h2>Order</h2>
		<p>Sign in to Order.</p>
		<button className="github" onClick={() => props.authenticate('Github')}>
		Log In With GitHub
		</button>
		<button className="facebook" onClick={() => props.authenticate('Facebook')}>
		Log In With Facebook
		</button>
	</nav>
);

export default Login;