import { MapContainer, Marker,Popup } from 'react-leaflet'

function MapReactTest(){
    return (
        <MapContainer center={[5.057812439656995, -75.49275659115038]} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '50vh' }}>
            <Marker position={[5.057812439656995, -75.49275659115038]}>
                <Popup>
                    AZEN
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapReactTest;