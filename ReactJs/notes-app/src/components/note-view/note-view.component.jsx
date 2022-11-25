import React from "react";

import NoteCard from "../note-card/note-card.component";

import "./note-view.css";

/**
 * 	Functional NoteView component, mainly a container
 * 	All state and functions passed from main App.js
 */

function NoteView(props) {
	const ifNotes = props.notes ? "notes-container" : "container";

	return (
		<main className={ifNotes}>
			{props.notes ? (
				<NoteCard
					notes={props.notes}
					openModal={props.openModal}
					setModalData={props.setModalData}
					modalData={props.modalData}
				/>
			) : (
				<div>
					<p className="empty-notes-title">No notes to display!</p>
					<p className="empty-notes-subtitle">Add some notes</p>
				</div>
			)}
		</main>
	);
}

export default NoteView;
