import React from "react";
// import "./header.scss";
import logo from '../../assets/imgs/hero-sec-image/logo.png'

const Header = () => {
	return (
		<div className="nav-container">
			{/* this is for the company logo */}
			<div className="partition-nav-1">
				<img src={logo} alt="" className="company-logo" />
				<span className="brand-text">Central Pet Care </span>
			</div>
			{/* this is for the link section */}
			<div className="partition-nav-2">
				<span className="nav-links">Home</span>
				<span className="nav-links">About</span>
				<span className="nav-links">Services</span>
				<span className="nav-links">Contact</span>
				<div className="nav-login-btn">Signup</div>
				<div className="nav-login-btn">Signin</div>
			</div>
		</div>
	);
};

export default Header;
