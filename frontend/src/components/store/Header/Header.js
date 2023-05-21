import React, { useState } from "react";
import "./header.scss";
import {SlArrowDown} from 'react-icons/sl'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {

	const navigate = useNavigate()
    const [visibility , setVisibility] = useState(false)

	return (
		<div className="nav-container">
			{/* this is for the company logo */}
			<div className="partition-nav-1">
				<img  alt="" className="company-logo" />
				<span className="brand-text">Central Pet Care </span>
			</div>
			{/* this is for the link section */}
			<div className="partition-nav-2">
				<span className="nav-links" onClick={()=>{
						navigate("/")
					}}>Home</span>
				{/* <span className="nav-links">About</span> */}
				<span className="nav-links" onClick={()=>{
						navigate("/services")
				}}>Services</span>
				<span className="nav-links"  onClick={()=>{
						navigate("/store")
				}}>Store</span>
				{/* <span className="nav-links">Contact</span> */}
				<div className={`partiton-nav-3 show`}>
                <img src='https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg' alt="" className="profile-cpt-image" />
                <button className="drop-btn-header-adv" onClick={()=>{setVisibility(!visibility)}}>
                    <SlArrowDown className="arrow-header-adv"/>
                </button>
                <div className={visibility ? `btn-section-header-adv` : `btn-section-header-adv hide`}>
                    <span className="scroller-btns">Profile</span>
                    
					<span className="scroller-btns" onClick={()=>{
						navigate("/account/myOrders")
					}}>MyOrders</span>
					<span className="scroller-btns">Logout</span>
                </div>
            </div>
			</div>
		</div>
	);
};

export default Header;