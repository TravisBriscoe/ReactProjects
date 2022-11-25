import React from "react";
import { createPortal } from "react-dom";

import ViewModal from "../view-modal/view-modal.component";
import EditModal from "../edit-modal/edit-modal.component";
import NewModal from "../new-modal/new-modal.component";

import "./modal.css";

/**
 *	Functional Modal component that passes props to
 *	corresponding modal components]
 *	Uses CreatePortal from React-Dom package to insert a new
 *	DOM render for easier modal creation
 */

function Modal(props) {
	return createPortal(
		<div className="modal-wrapper">
			{props.isEdit ? (
				<EditModal
					modalData={props.modalData}
					onSaveNote={props.onSaveNote}
					toggleIsEdit={props.toggleIsEdit}
					closeModal={props.closeModal}
					deleteNote={props.deleteNote}
					setEditData={props.setEditData}
					editNote={props.editNote}
				/>
			) : props.isNew ? (
				<NewModal
					newNote={props.newNote}
					closeModal={props.closeModal}
					onSaveNote={props.onSaveNote}
					toggleIsNew={props.toggleIsNew}
					setNewData={props.setNewData}
				/>
			) : (
				<ViewModal
					modalData={props.modalData}
					toggleIsEdit={props.toggleIsEdit}
					deleteNote={props.deleteNote}
					closeModal={props.closeModal}
					onSaveNote={props.onSaveNote}
				/>
			)}
		</div>,
		document.querySelector("#modal")
	);
}

export default Modal;
