import React from "react";
import ls from "local-storage";

import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Header from "./components/header/header.component";
import NoteView from "./components/note-view/note-view.component";
import Modal from "./components/modal/modal-component";
import Footer from "./components/footer/footer.component";

import "./App.css";

/**
 * 	Main App.js file
 * 	Contains all state and functions, passing
 * 	corresponding state and functions to
 * 	necessary components
 */

class NoteApp extends React.Component {
	constructor(props) {
		super(props);

		// Binds all needed functions to 'this'
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.toggleIsEdit = this.toggleIsEdit.bind(this);
		this.toggleIsNew = this.toggleIsNew.bind(this);
		this.setModalData = this.setModalData.bind(this);
		this.setEditData = this.setEditData.bind(this);
		this.setNewData = this.setNewData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onSaveNote = this.onSaveNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.deleteAll = this.deleteAll.bind(this);

		// creating needed state variables
		this.state = {
			notes: null,
			isModalOpen: false,
			isNew: false,
			isEdit: false,
			modalData: {
				id: "",
				title: "",
				text: "",
				priority: "",
			},
			newNote: {
				id: "",
				title: "",
				text: "",
				priority: "normal",
			},
			editNote: {
				id: "",
				title: "",
				text: "",
				priority: "",
			},
		};
	}

	// Calls after mount and fetches any locally saved notes
	componentDidMount() {
		if (ls.get("notes")) {
			this.setState({ notes: [...ls.get("notes")] });
		}
	}

	// Sets 'isModalOpen' state to 'true'
	openModal() {
		this.setState({ isModalOpen: true });
	}

	// Sets 'isModalOpen' state to 'false'
	closeModal() {
		this.setState({ isModalOpen: false });
	}

	// Toggles 'isNew' state from 'true' or 'false'
	// Clears 'newNote' state if set to 'false'
	toggleIsNew() {
		this.setState({ isNew: !this.state.isNew });

		if (!this.state.isNew) {
			this.setState({
				newNote: {
					id: "",
					title: "",
					text: "",
					priority: "normal",
				},
			});
		}
	}

	// Toggle 'isEdit' state from 'true' or 'false'
	// Clears 'editNote' state if set to 'false'
	toggleIsEdit() {
		this.setState({ isEdit: !this.state.isEdit }, () => {
			if (this.state.isEdit) {
				this.setState({
					editNote: {
						id: this.state.modalData.id,
						title: this.state.modalData.title,
						text: this.state.modalData.text,
						priority: this.state.modalData.priority,
					},
				});
			} else {
				this.setState({
					editNote: {
						id: "",
						title: "",
						text: "",
						priority: "",
					},
				});
			}
		});
	}

	// Sets 'modalData' state for loading
	// specific notes in the modal
	setModalData(data) {
		this.setState({
			modalData: {
				...data,
			},
		});
	}

	// Sets 'editNote' state to the entered values
	// without overwriting old values
	setEditData(event) {
		const { name, value } = event.target;
		const oldData = this.state.editNote;
		oldData[name] = value;

		this.setState({
			editNote: {
				...oldData,
			},
		});
	}

	// Sets "newNote" state to the entered values
	// without overwriting old values
	setNewData(event) {
		const { name, value } = event.target;
		const oldData = this.state.newNote;

		oldData[name] = value;

		this.setState({
			newNote: {
				...oldData,
			},
		});
	}

	// Handles changes to any input fields
	handleChange(event) {
		const { name, value } = event.target;

		if (this.props.isEdit) {
			const oldState = this.state.editNote;

			oldState[name] = value;

			this.setState({
				editNote: {
					...oldState,
				},
			});
		} else if (this.props.isNew) {
			const oldState = this.state.newNote;

			oldState[name] = value;

			this.setState({
				newNote: {
					...oldState,
					id: this.state.notes.length + 1,
				},
			});
		} else return;
	}

	// Handles saving notes, either new or edited
	onSaveNote(event) {
		event.preventDefault();

		if (this.state.isEdit) {
			const newNotes = this.state.notes;
			const { id, title, text, priority } = this.state.editNote;
			const editIndex = this.state.notes.findIndex((el) => {
				return el.id === this.state.editNote.id;
			});

			newNotes[editIndex] = {
				id,
				title,
				text,
				priority,
			};

			this.setState(
				{
					notes: newNotes,
				},
				() => {
					this.toggleIsEdit();
					this.closeModal();
					ls.set("notes", [...this.state.notes]);
				}
			);
		} else if (this.state.isNew) {
			const newNoteData = this.state.newNote;

			let newId = "";

			if (!this.state.notes) {
				newId = "note001";
			} else if (this.state.notes.length < 10) {
				newId = `note00${this.state.notes.length + 1}`;
			} else {
				newId = `note0${this.state.notes.length + 1}`;
			}

			newNoteData.id = newId;

			let oldNotes = [];
			if (this.state.notes) {
				oldNotes = this.state.notes;
			}

			oldNotes.push(newNoteData);

			this.setState(
				{ notes: [...oldNotes], newNote: { title: "", text: "", priority: "" } },
				() => {
					this.toggleIsNew();
					this.closeModal();
					ls.set("notes", [...this.state.notes]);
				}
			);
		}
	}

	// Deletes specific note from state
	// and commits the new 'notes' state array to
	// local storage
	deleteNote() {
		const newNotes = this.state.notes;

		const removed = newNotes.filter((i) => i.title !== this.state.modalData.title);

		for (let i = 0; i < removed.length; i++) {
			if (removed.length < 10) removed[i].id = `note00${i + 1}`;
			else removed[i].id = `note0${i + 1}`;
		}

		this.setState({ notes: removed }, () => {
			if (this.state.notes.length === 0) {
				ls.clear();
				this.setState({ notes: null });
			} else ls.set("notes", [...this.state.notes]);
		});
	}

	// Deletes all notes from state and commits
	// the new "notes" state array to local storage
	deleteAll() {
		if (window.confirm("Delete All Notes?") === true) {
			if (ls.get("notes")) ls.clear();
			this.setState({ notes: null }, () => ls.clear());
		}
	}

	render() {
		const shouldBlur = this.state.isModalOpen ? "main-container blur" : "main-container";

		return (
			<ErrorBoundary closeModal={this.closeModal}>
				<div className={shouldBlur}>
					<Header />
					<NoteView
						openModal={this.openModal}
						notes={this.state.notes}
						setModalData={this.setModalData}
						modalData={this.state.modalData}
					/>
					{this.state.isModalOpen ? (
						<div className="modal-wrapper">
							<Modal
								modalData={this.state.modalData}
								closeModal={this.closeModal}
								isNew={this.state.isNew}
								isEdit={this.state.isEdit}
								toggleIsNew={this.toggleIsNew}
								toggleIsEdit={this.toggleIsEdit}
								handleChange={this.handleChange}
								editNote={this.state.editNote}
								newNote={this.state.newNote}
								onSaveNote={this.onSaveNote}
								notes={this.state.notes}
								deleteNote={this.deleteNote}
								setEditData={this.setEditData}
								setNewData={this.setNewData}
							/>
						</div>
					) : null}
					<Footer
						deleteAll={this.deleteAll}
						toggleIsNew={this.toggleIsNew}
						openModal={this.openModal}
					/>
				</div>
			</ErrorBoundary>
		);
	}
}

export default NoteApp;
