import React from "react";

import "./note-card.css";

/**
 * 	Functional card component for displaying notes
 * 	in a neat display
 * 	All state and functions are passed from main App.js
 */

function NoteCard(props) {
	return props.notes
		? props.notes.map((el) => {
				return (
					<div
						key={el.id}
						className="notes-card"
						onClick={() => {
							props.setModalData({
								id: el.id,
								title: el.title,
								text: el.text,
								priority: el.priority,
							});
							props.openModal();
						}}
					>
						<div className="card-title">
							<h1
								className={el.title.length > 12 ? "notes-title notes-title-large" : "notes-title"}
							>
								{el.title}
							</h1>
							{el.priority === "high" ? (
								<div className="notes-priority-container">
									<p className="notes-priority-label high-priority">high</p>
									<p className="notes-priority-action high-priority">priority</p>
								</div>
							) : el.priority === "low" ? (
								<div className="notes-priority-container">
									<p className="notes-priority-label low-priority">low</p>
									<p className="notes-priority-action low-priority">priority</p>
								</div>
							) : (
								<div className="notes-priority-container">
									<p className="notes-priority-label normal-priority">normal</p>
									<p className="notes-priority-action normal-priority">priority</p>
								</div>
							)}
						</div>
						<p className="notes-text">{el.text}</p>
						<div className="notes-nav">
							<p>(click to view)</p>
						</div>
					</div>
				);
		  })
		: null;
}

export default NoteCard;
