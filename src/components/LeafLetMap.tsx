import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer } from 'react-leaflet';
import WorldMap from './WorldMap';
// import 'leaflet/dist/leaflet.css';

export interface DataType {
    country: string,
    longitude: number,
    latitude: number,
    activeCases: number,
    recovered: number,
    deaths: number
}

const LeafLetMap = () => {
    const [countriesData, setCountriesData] = useState<DataType[]>([]);
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

    const getAllCountriesData = async () => {
        const res = await fetch('https://disease.sh/v3/covid-19/countries');
        return res.json();
    }
    const { data, error, isLoading } = useQuery('allCountriesData', getAllCountriesData);

    useEffect(() => {
        if (data) {
            const arr = data.map((ele: any) => ({ country: ele.country, longitude: ele.countryInfo.long, latitude: ele.countryInfo.lat, activeCases: ele.active, recovered: ele.recovered, deaths: ele.deaths }));
            setCountriesData(arr as DataType[]);
        }
    }, [data]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    if (error) return <div>Request Failed</div>
    else if (isLoading) return <div>Loading....</div>

    return (
        <div className='border-2 border-blue-500 w-full  h-[100vh] pt-40 m-auto'>
            <MapContainer className="m-auto w-full  border-blue-700" bounds={[[-60, -180], [85, 180]]} zoom={12} center={[userLocation.latitude, userLocation.longitude]} scrollWheelZoom={true} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                />
                <WorldMap countriesData={countriesData} />
            </MapContainer>
        </div>
    )
}

export default LeafLetMap;
