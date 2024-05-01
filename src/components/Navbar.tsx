import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface RouteItem {
    route: string;
    name: string;
}
const Navbar = () => {
    const navigate = useNavigate();
    const [currentNav, setCurrentNav] = useState(window.location.pathname);
    const routes: RouteItem[] = [{ route: '/', name: "Contacts" }, { route: '/maps-and-charts', name: "Maps & Charts" }];
    const handleButtonClick = (ele: RouteItem) => {
        setCurrentNav(ele.route);
        navigate(ele.route);
    }
    return (
        <div className="flex justify-between items-center h-[4rem] bg-darkColorOne px-2 md:px-5">
            <p className="text-md font-bold sm:text-2xl text-accentYellow">ContactApp</p>
            <div className="flex justify-end gap-5 ">
                {routes.map(ele => <button key={ele.name} onClick={() => handleButtonClick(ele)} className={`text-accentWhite text-sm sm:text-lg cursor-pointer border-b-2 ${currentNav === ele.route ? "border-b-accentWhite" : "border-b-darkColorOne"} `}>{ele.name}</button>)}
            </div>
        </div>
    )
}

export default Navbar;