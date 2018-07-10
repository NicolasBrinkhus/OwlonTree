import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IntroStore from "./IntroStore";
import Delivery from "./Delivery";
import Address from "./Address";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={IntroStore} />
			<Route path="/store/delivery" component={Delivery} />
			<Route path="/store/address" component={Address} />
			<Route path="/store/:storeId" component={App} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default Router;