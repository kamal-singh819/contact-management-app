import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteContact, currentContact } from "../features/contactSlice";
import { useDispatch } from 'react-redux';
import { Dispatch } from "@reduxjs/toolkit";
import { ContactType } from "../features/contactSlice";
import { useState } from "react";

interface ContactProps {
    contact: ContactType;
}
const Contact: React.FC<ContactProps> = ({ contact }) => {
    const dispatch: Dispatch<any> = useDispatch();
    const [view, setView] = useState(false);

    const handleDelete = () => {
        dispatch(deleteContact(contact.id));
    }
    const handleUpdate = () => {
        dispatch(currentContact(contact));
    }

    const handleToggleVisibility = () => {
        setView(prev => !prev);
    }

    return (
        <div className="col-span-1 px-6 py-4 pb-6 text-accentWhite bg-[#bbd0ff] rounded-xl relative">
            <div className="flex gap-2">
                <p className="text-[#000] text-lg font-semibold">Name:</p>
                <p className="text-darkColorTwo text-lg font-semibold">{contact.name}</p>
            </div>
            <div className="flex gap-2">
                <p className="text-[#000] text-lg font-semibold">Email:</p>
                <p className="text-darkColorTwo text-lg font-semibold">{contact.email}</p>
            </div>
            <div className="flex gap-2">
                <p className="text-[#000] text-lg font-semibold">Phone:</p>
                <p className="text-darkColorTwo text-lg font-semibold">{contact.phone}</p>
            </div>
            <div className="flex gap-2">
                <p className="text-[#000] text-xl font-semibold">Address:</p>
                <p className="text-darkColorTwo text-lg font-semibold">{contact.address}</p>
            </div>
            <div className="flex gap-2">
                <p className="text-[#000] text-lg font-semibold">Status:</p>
                <p className={`${contact.status === 'Active' ? "text-accentGreen" : "text-accentRed"} text-lg font-semibold`}>{contact.status}</p>
            </div>
            <FaEdit onClick={handleUpdate} className="text-darkColorOne md:text-xl cursor-pointer absolute top-3 right-10" />
            <MdDelete onClick={handleDelete} className="text-darkColorOne md:text-xl cursor-pointer absolute top-3 right-3" />
            <div className={`absolute ${view ? "bottom-0 h-[2rem]" : "top-[3rem] h-[79%] bg-[#bbd0ff]"} left-0 w-full rounded-xl flex justify-center`}>
                <button onClick={handleToggleVisibility} className="text-[#6c757d] italic">{view ? "Hide" : "View"}</button>
            </div>
        </div>
    )
}
export default Contact;