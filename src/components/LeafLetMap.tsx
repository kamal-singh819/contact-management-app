import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface DataType {
    country: string,
    longitude: number,
    latitude: number,
    activeCases: number,
    recovered: number,
    deaths: number
}
interface MarkerDataType {
    position: [number, number];
    country: string;
    popUpContent: string;
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

    const markers: MarkerDataType[] = countriesData.map(country => {
        const { country: name, activeCases, deaths, recovered } = country;
        const popUpContent = `
            <div>
                <h2>${name}</h2>
                <p>Active Cases: ${activeCases}</p>
                <p>Deaths: ${deaths}</p>
                <p>Recovered: ${recovered}</p>
            </div>`;

        return {
            position: [country.latitude, country.longitude],
            country: name,
            popUpContent: popUpContent
        }
    });

    return (
        <div className='p-20 w-[100vw] '>
            <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={3} style={{ width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {markers.map((marker) => (
                    <Marker key={marker.country} position={marker.position}>
                        <Popup>{marker.popUpContent}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default LeafLetMap;
