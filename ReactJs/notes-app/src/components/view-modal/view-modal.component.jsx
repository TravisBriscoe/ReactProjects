import React from "react";

import Button from "../button/button.component";

import "./view-modal.css";

/**
 * 	Functional modal Component for Viewing Notes
 * 	All state and functions passed from main App.js
 */

function ViewModal(props) {
	const priorityLevel =
		props.modalData.priority === "high"
			? "high-priority modal-priority-label"
			: props.modalData.priority === "low"
			? "low-priority modal-priority-label"
			: "modal-priority-label";

	return (
		<div className="modal-view">
			<div className="modal-title-container">
				<h1 className="modal-title">{props.modalData.title}</h1>
				<div className="modal-priority-container">
					<p>Priority:</p>
					<p className={priorityLevel}>{props.modalData.priority} priority</p>
				</div>
			</div>
			<p className="modal-text">{props.modalData.text}</p>
			<div className="modal-nav">
				<Button onClick={() => props.toggleIsEdit()}>Edit</Button>
				<Button
					onClick={() => {
						props.deleteNote(props.modalData);
						props.closeModal();
					}}
				>
					Delete
				</Button>
				<Button onClick={() => props.closeModal()}>close</Button>
			</div>
		</div>
	);
}

export default ViewModal;
