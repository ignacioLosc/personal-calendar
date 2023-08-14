import { useEffect } from "react";
import { useStore } from "./store";
import { expect } from "vitest";
import { vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("zustand");

function TestComponent({ selector, effect }) {
  const items = useStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
}

test("should return default value at the start", () => {
  const selector = (store) => store.contacts;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([
    { name: "Tom", phone: "1161498121", id: 1 },
  ]);
});

test("should add an item to the store and rerun the effect", () => {
  const selector = (store) => ({
    contacts: store.contacts,
    addContact: store.addContact,
  });
  const effect = vi.fn().mockImplementation((items) => {
    if (items.contacts.length === 1) {
      items.addContact("nameA", "phone10", 2);
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({
      contacts: [
        { name: "Tom", phone: "1161498121", id: 1 },
        { name: "nameA", phone: "phone10", id: 2 },
      ],
    })
  );
});

test("should add a contact to the store and rerun the effect and then delete said contact", () => {
  const selector = (store) => ({
    contacts: store.contacts,
    addContact: store.addContact,
    deleteContact: store.deleteContact,
  });
  let createdContact = false;
  let currentItems;
  const effect = vi.fn().mockImplementation((items) => {
    currentItems = items;
    if (!createdContact) {
      items.addContact("nameA", "1161498121", 2);
      createdContact = true;
    } else if (items.contacts.length === 2) {
      items.deleteContact(2);
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
  expect(currentItems.contacts).toEqual([
    {
      name: "Tom",
      phone: "1161498121",
      id: 1,
    },
  ]);
});
