import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "@reduxjs/toolkit";
import { addContact, updateContact, clearCurrentContact } from "../features/contactSlice";
import { nanoid } from 'nanoid';
import { useState, useEffect } from "react";
import { ContactType } from "../features/contactSlice";
import { RootState } from "../store/store";


const InputForm: React.FC = () => {
    const currentContact = useSelector((state: RootState) => state.contacts.currentContact);
    const dispatch: Dispatch<any> = useDispatch();
    const [name, setName] = useState(currentContact?.name || '');
    const [email, setEmail] = useState(currentContact?.email || '');
    const [phone, setPhone] = useState(currentContact?.phone || '');
    const [address, setAddress] = useState(currentContact?.address || '');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setPhone(currentContact.phone);
            setAddress(currentContact.address);
            setStatus(currentContact.status);
        }
    }, [currentContact]);


    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(status);
        if (!name || !email || !phone || !address) {
            console.log("All fields manadatory");
            return;
        }
        else {
            if (currentContact) {
                const updatableContact: ContactType = { id: currentContact.id, name, email, phone, address, status };
                dispatch(updateContact(updatableContact));
                dispatch(clearCurrentContact());
            }
            else {
                const newContact: ContactType = { id: nanoid(), name, email, phone, address, status };
                dispatch(addContact(newContact));
            }
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setStatus('active');
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <input value={name} onChange={(e) => setName(e.target.value)} className=" col-span-1 px-2 py-2 rounded focus:outline-none text-xl" type="text" placeholder="Name" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className=" col-span-1 px-2 py-2 rounded focus:outline-none text-xl" type="email" placeholder="Email " />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className=" col-span-1 px-2 py-2 rounded focus:outline-none text-xl" type="tel" placeholder="Mobile No. " />
                <input value={address} onChange={(e) => setAddress(e.target.value)} className=" col-span-1 px-2 py-2 rounded focus:outline-none text-xl" type="text" placeholder="Full Address" />
                <div className="flex gap-4">
                    <label className="text-accentWhite text-xl cursor-pointer" htmlFor="active"><input className="w-4 h-4 mr-2 cursor-pointer" onChange={(e) => setStatus(e.target.value)} id="active" value="Active" name="status" type="radio" checked />Active</label>
                    <label className="text-accentWhite text-xl cursor-pointer" htmlFor="inactive"><input className="w-4 h-4 mr-2 cursor-pointer" onChange={(e) => setStatus(e.target.value)} id="inactive" value="In-active" name="status" type="radio" />In-active</label>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-accentOrange text-accentWhite p-2 max-w-[10rem] rounded-md">{currentContact ? "Update Contact" : "Add Contact"}</button>
            </div>
        </form>
    )
}
export default InputForm;