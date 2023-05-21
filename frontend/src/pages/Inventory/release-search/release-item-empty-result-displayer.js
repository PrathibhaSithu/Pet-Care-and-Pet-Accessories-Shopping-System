import React from "react";
import "./release-items-message-displayer.scss";
import EmptyResult from "../../../assets/imgs/error-displayers/no-data.png";
function NoItemssDisplayer() {
	return (
		<div className="operation-unsuccess-container">
			<img src={EmptyResult} alt="" className="imgblock" />
			<span className="message-box">No Results, Try another search</span>
		</div>
	);
}

export default NoItemssDisplayer;
