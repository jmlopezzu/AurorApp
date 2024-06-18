// pages/MapPage.tsx
import Map from '../components/map/Map'; // Asegúrate de que la ruta sea correcta
import * as L from 'leaflet';

interface MapPageProps {
  setCurrentPosition: (position: L.LatLng) => void;
}

const MapPage: React.FC<MapPageProps> = ({ setCurrentPosition }) => {
  return (
    <div>
      <Map setCurrentPosition={setCurrentPosition} />
    </div>
  );
};

export default MapPage;
