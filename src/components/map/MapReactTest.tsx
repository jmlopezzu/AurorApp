import { useEffect, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

function Map() {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    const initMap = (latitude: number, longitude: number) => {
      if (map) return; // Prevent multiple initializations

      const newMap = L.map('map').setView([latitude, longitude], 15); // Adjust zoom level here
      const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
        maxZoom: 18
      }).addTo(newMap);

      // Initialize paloma (car) marker
      const palomaIcon = L.icon({
        iconUrl: 'paloma.png',
        iconSize: [40, 30]
      });

      // Initialize mark icon for static markers
      const markIcon = L.icon({
        iconUrl: 'marker-icon-2x.png',
        iconSize: [17, 21]
      });

      // Add the paloma (car) marker initially
      const movingMarker = L.marker([latitude, longitude], { icon: palomaIcon }).addTo(newMap);

      // Handle map click event
      newMap.on('click', function (e: L.LeafletMouseEvent) {
        console.log(e);

        // Add a static marker at the clicked location
        L.marker(e.latlng, { icon: markIcon }).addTo(newMap);

        // Initialize routing control with waypoints
        (L as any).Routing.control({
          waypoints: [
            new L.LatLng(latitude, longitude), // Start point
            new L.LatLng(e.latlng.lat, e.latlng.lng) // End point (clicked location)
          ]
        }).on('routesfound', function (e: any) {
          const routes = e.routes;
          console.log(routes);

          // Move the paloma (car) marker along the route
          e.routes[0].coordinates.forEach(function (coord: L.LatLng, index: number) {
            setTimeout(function () {
              movingMarker.setLatLng(coord);
            }, 100 * index);
          });
        }).addTo(newMap);
      });

      setMap(newMap);
    };

    const watchUserLocation = () => {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`zGPS: Latitude ${latitude}, Longitude ${longitude}`);
          if (!map) {
            initMap(latitude, longitude);
          } else {
            const center = new L.LatLng(latitude, longitude);
            map.setView(center, 15); // Adjust zoom level if needed
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          // Fallback to default coordinates if geolocation fails
          const fallbackLat = 5.057792948415949;
          const fallbackLng = -75.49272543747631;
          console.log(`Fallback to default location: Latitude ${fallbackLat}, Longitude ${fallbackLng}`);
          if (!map) {
            initMap(fallbackLat, fallbackLng);
          } else {
            const center = new L.LatLng(fallbackLat, fallbackLng);
            map.setView(center, 15); // Adjust zoom level if needed
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

      return () => {
        navigator.geolocation.clearWatch(geoId);
      };
    };

    watchUserLocation();

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [map]);

  return (
    <div className='Map'>
      <div id="map" style={{ height: '100vh' }}></div>
    </div>
  );
}

export default Map;
