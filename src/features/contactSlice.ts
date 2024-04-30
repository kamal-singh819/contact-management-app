import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactType {
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    status: string
}
interface ContactsState {
    contacts: ContactType[],
    currentContact: ContactType | null;
}

const initialState: ContactsState = {
    contacts: [],
    currentContact: null
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<ContactType>) => {
            const index = state.contacts.findIndex(contact => contact.email === action.payload.email);
            if (index === -1) state.contacts.push(action.payload);
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },
        updateContact: (state, action: PayloadAction<ContactType>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) state.contacts[index] = action.payload;
        },
        currentContact: (state, action: PayloadAction<ContactType>) => {
            state.currentContact = action.payload;
        },
        clearCurrentContact: (state) => {
            state.currentContact = null;
        }
    }
});

export const { addContact, deleteContact, updateContact, currentContact, clearCurrentContact } = contactSlice.actions;
export default contactSlice.reducer;