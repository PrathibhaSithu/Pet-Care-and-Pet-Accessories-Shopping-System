import React from "react";
import "./message-displayer.scss";
import EmptyResult from "../Imgs/error-displayers/no-data.png";
function NoItemsDisplayer() {
	return (
		<div className="operation-unsuccess-container">
			<img src={EmptyResult} alt="" className="imgblock" />
			<span className="message-box">No Processing Orders currently</span>
		</div>
	);
}

export default NoItemsDisplayer;
