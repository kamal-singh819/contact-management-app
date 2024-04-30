import { Routes, Route } from 'react-router-dom';
import ContactPage from "./pages/ContactPage";
import MapsCharts from './pages/MapsCharts';
import Navbar from './components/Navbar';
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Provider store={store}> <ContactPage /> </Provider>} />
                <Route path='/maps-and-charts' element={<MapsCharts />} />
            </Routes>
        </div>
    );
}

export default App;
