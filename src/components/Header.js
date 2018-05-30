import React from "react";

class Header extends React.Component{
	render() {
		return (
			<header className="top">
				<h1>
					<span className="owl">Owl</span> 
					<span className="ofThe">
						<span className="of">in</span>
						<span className="the">the</span>
					</span>
					<span className="tree">Tree</span>
				</h1>
				<h3 className="tagline">
					<span>{this.props.tagline}</span>
				</h3>
			</header>
		)
	}
}

export default Header;