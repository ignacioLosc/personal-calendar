import "./Contact.css";
import { useStore } from "../store";
import { useState } from "react";

export default function Contact({ id }) {
  const [open, setOpen] = useState(false);
  const [editView, setEditView] = useState(false);
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");

  const contact = useStore((store) => {
    return store.contacts.find((contact) => contact.id === id);
  });
  const deleteContact = useStore((store) => store.deleteContact);
  const editContact = useStore((store) => store.editContact);

  const NAME_INPUT_PLACEHOLDER = `${contact.name}`;
  const PHONE_INPUT_PLACEHOLDER = `${contact.phone}`;

  return (
    <section className="contact">
      <div className="contact-name">{contact.name}</div>
      <div className="buttons">
        <div className="edit-button">
          <button onClick={() => setOpen(true)}>View</button>
        </div>
        <div className="delete-button">
          <button
            onClick={() => {
              deleteContact(contact.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {open && (
        <section className="view-modal">
          <div className="view-modal-content">
            <div className="view-modal-title">Contact Details</div>
            <div className="modal-input">
              <div>Contact name:</div>
              {editView ? (
                <input
                  onChange={(e) => setNameText(e.target.value)}
                  value={nameText}
                  placeholder={NAME_INPUT_PLACEHOLDER}
                ></input>
              ) : (
                <div>{contact.name}</div>
              )}
            </div>
            <div className="modal-input">
              <div>Contact number:</div>
              {editView ? (
                <input
                  onChange={(e) => setPhoneText(e.target.value)}
                  value={phoneText}
                  placeholder={PHONE_INPUT_PLACEHOLDER}
                ></input>
              ) : (
                <div>{contact.phone}</div>
              )}
            </div>
            <div className="view-modal-buttons">
              <div className="view-edit-button">
                {editView ? (
                  <button
                    onClick={() => {
                      let newName = "";
                      let newNumber = "";
                      if (nameText.length === 0) {
                        newName = contact.name;
                      } else {
                        newName = nameText;
                      }
                      if (phoneText.length === 0) {
                        newNumber = contact.phone;
                      } else {
                        newNumber = phoneText;
                      }
                      editContact(newName, newNumber, contact.id);
                      setNameText("");
                      setPhoneText("");
                      setEditView(false);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditView(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="view-back-button">
                {editView ? (
                  <button
                    onClick={() => {
                      setNameText("");
                      setPhoneText("");
                      setEditView(false);
                    }}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
