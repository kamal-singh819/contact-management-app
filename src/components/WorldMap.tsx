import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import markerIcon from '../assets/marker.png';
import { DataType } from "./LeafLetMap";

interface CountriesDataProps {
    countriesData: DataType[]
}

const WorldMap: React.FC<CountriesDataProps> = ({ countriesData }) => {
    const customMarker = L.icon({ iconUrl: markerIcon, iconSize: [20, 25], iconAnchor: [15, 30] });
    return (
        <div >
            {countriesData.map((data: any) => (
                <Marker icon={customMarker} key={data.country} position={[data.latitude, data.longitude]} >
                    <Popup>
                        <div>
                            <h2>{data.country}</h2>
                            <p>
                                Active Cases: {data.activeCases} <br />
                                Recovered Cases: {data.recovered} <br />
                                Deaths: {data.deaths}
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </div>
    )
}

export default WorldMap;