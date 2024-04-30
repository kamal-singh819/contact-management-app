import Contact from "./Contact";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ContactType } from "../features/contactSlice";
const DisplayContacts = () => {
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    return (
        <div>
            {contacts.length !== 0 && <p className="text-accentWhite text-2xl mb-4">List of Contacts</p>}
            {contacts.length === 0 ? <p className="text-center text-accentWhite mt-10">No Contacts Found</p> :
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {contacts.map((contact: ContactType) => <Contact key={contact.id} contact={contact} />)}
                </div>}
        </div>
    )
}
export default DisplayContacts;