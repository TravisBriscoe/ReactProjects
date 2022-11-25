import React from "react";

import Button from "../button/button.component";

import "./new-modal.css";

/**
 * 	Functional modal component for creating New Notes
 * 	All state and functions are passed from props
 */

function NewModal(props) {
	return (
		<form className="modal-new" onSubmit={props.onSaveNote}>
			<div className="new-note-title">
				<p>New Note!</p>
			</div>
			<div className="new-title">
				<label htmlFor="title" className="new-title-label">
					Note Title:
				</label>
				<input
					name="title"
					id="title"
					type="text"
					required
					placeholder="Note Title"
					className="new-title-input"
					value={props.newNote.title}
					onChange={props.setNewData}
				/>
			</div>
			<textarea
				name="text"
				placeholder="Note Text"
				className="new-text"
				required
				value={props.newNote.text}
				onChange={props.setNewData}
			></textarea>
			<div>
				<label htmlFor="priority">Priority:</label>
				<select
					name="priority"
					id="priority"
					value={props.newNote.priority}
					onChange={props.setNewData}
				>
					<option value="normal">Normal</option>
					<option value="high">High</option>
					<option value="low">Low</option>
				</select>
			</div>
			<div className="modal-nav">
				<input className="modal-new-submit" type="submit" value="SAVE" />
				<Button
					onClick={() => {
						props.toggleIsNew();
						props.closeModal();
					}}
				>
					cancel
				</Button>
			</div>
		</form>
	);
}

export default NewModal;
