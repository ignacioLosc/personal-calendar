import "./Column.css";
import Contact from "./Contact";
import { useStore } from "../store";
import { useState } from "react";

const NAME_INPUT_PLACEHOLDER = "Enter a contact name";
const PHONE_INPUT_PLACEHOLDER = "+54 11 6149-8121";
const SEARCH_BAR_PLACEHOLDER = "Search contact";

export default function Column() {
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = useState(false);

  const contacts = useStore((store) => store.contacts);
  const addContact = useStore((store) => store.addContact);
  const filteredContacts = useStore((store) => store.filteredContacts);
  const filterContacts = useStore((store) => store.filterContacts);

  return (
    <section className="column">
      <div className="column-modifiers">
        <div className="add-button">
          <button onClick={() => setOpen(true)}>Add contact</button>
        </div>
        <div className="input-wrapper">
          <input
            className="column-input-filter"
            placeholder={SEARCH_BAR_PLACEHOLDER}
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              filterContacts(e.target.value);
            }}
          ></input>
          <div class="filter-clear-button">
            <button onClick={() => setFilterText("")}>X</button>
          </div>
        </div>
      </div>
      {(filterText.length > 0 ? filteredContacts : contacts).map((contact) => {
        return <Contact id={contact.id} key={contact.id} />;
      })}
      {open && (
        <section className="Modal">
          <div className="modal-content">
            <div className="modal-title">Add a new contact</div>
            <div className="modal-input">
              <div>Contact name:</div>
              <input
                onChange={(e) => setNameText(e.target.value)}
                value={nameText}
                placeholder={NAME_INPUT_PLACEHOLDER}
              ></input>
            </div>
            <div className="modal-input">
              <div>Contact number:</div>
              <input
                onChange={(e) => setPhoneText(e.target.value)}
                value={phoneText}
                placeholder={PHONE_INPUT_PLACEHOLDER}
              ></input>
            </div>
            <div className="modal-buttons">
              <div className="submit-button">
                <button
                  onClick={() => {
                    let newId = 1;
                    if (contacts.length !== 0) {
                      newId = contacts[contacts.length - 1].id + 1;
                    }
                    if (nameText.length === 0 || phoneText.length === 0) {
                      alert("The contact's fields can't be empty!");
                    } else {
                      addContact(nameText, phoneText, newId);
                      setNameText("");
                      setPhoneText("");
                      setOpen(false);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
              <div className="cancel-button">
                <button
                  onClick={() => {
                    setNameText("");
                    setPhoneText("");
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
