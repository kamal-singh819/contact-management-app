import InputForm from "../components/InputForm";
import DisplayContacts from "../components/DisplayContacts";
const ContactPage = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-darkColorTwo px-2 md:px-5 xl:px-40 py-8 overflow-y-scroll">
            <p className="text-accentWhite text-3xl mb-4 text-center">Contact Page</p>
            <InputForm />
            <DisplayContacts />
        </div>
    )
}
export default ContactPage;