import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const store = (set) => ({
  contacts: [{ name: "Tom", phone: "1161498121", id: 1 }],
  filteredContacts: [],
  addContact: (name, phone, id) =>
    set((store) => ({ contacts: [...store.contacts, { name, phone, id }] })),
  deleteContact: (id) =>
    set((store) => ({
      contacts: store.contacts.filter((contact) => contact.id !== id),
    })),
  editContact: (name, phone, id) =>
    set((store) => ({
      contacts: [
        ...store.contacts.filter((contact) => contact.id !== id),
        { name, phone, id },
      ],
    })),
  filterContacts: (filter) =>
    set((store) => ({
      filteredContacts: store.contacts.filter((contact) =>
        contact.name.toLowerCase().startsWith(filter.toLowerCase())
      ),
    })),
});

/* export const useStore = create(persist(devtools(store), { name: "myStore" })); */
export const useStore = create(store);
