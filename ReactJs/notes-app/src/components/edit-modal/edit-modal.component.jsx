import React from "react";
import Button from "../button/button.component";

import "./edit-modal.css";

/** Modal for editing notes
		Functional component that recieves state and functions from main App.js
*/
function EditModal(props) {
	return (
		<form className="modal-edit" onSubmit={props.onSaveNote}>
			<label className="modal-edit-label">Edit Note</label>
			<div className="modal-edit-container">
				<div className="modal-edit-title-container">
					<input
						className="modal-edit-title"
						name="title"
						value={props.editNote.title}
						onChange={props.setEditData}
					/>
				</div>
				<textarea
					className="modal-edit-text"
					name="text"
					value={props.editNote.text}
					onChange={props.setEditData}
				></textarea>
				<div className="modal-edit-priority-container">
					<label htmlFor="priority">Priority:</label>
					<select
						name="priority"
						id="priority"
						value={props.editNote.priority}
						onChange={props.setEditData}
					>
						<option value="normal">Normal</option>
						<option value="high">High</option>
						<option value="low">Low</option>
					</select>
				</div>
			</div>
			<div className="modal-nav">
				<input className="modal-edit-submit" type="submit" value="SAVE" />
				<Button
					onClick={() => {
						props.deleteNote(this.props.editNote);
					}}
				>
					Delete
				</Button>
				<Button
					onClick={() => {
						props.toggleIsEdit();
					}}
				>
					cancel
				</Button>
			</div>
		</form>
	);
}

export default EditModal;
