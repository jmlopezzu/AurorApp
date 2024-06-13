import { useEffect } from 'react';
import * as L from 'leaflet';
import { LatLng, LeafletMouseEvent } from 'leaflet'; // Import LatLng and LeafletMouseEvent
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine'; // Import leaflet-routing-machine separately
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function Map() {
  useEffect(() => {
    // Initialize map only once when the component mounts
    const map = L.map('map').setView([5.057812439656995, -75.49275659115038], 11);
    const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
      maxZoom: 18
    }).addTo(map);

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
    const movingMarker = L.marker([5.057812439656995, -75.49275659115038], { icon: palomaIcon }).addTo(map);

    // Handle map click event
    map.on('click', function (e: LeafletMouseEvent) {
      console.log(e);

      // Add a static marker at the clicked location
      L.marker(e.latlng, { icon: markIcon }).addTo(map);

      // Initialize routing control with waypoints
      (L as any).Routing.control({
        waypoints: [
          new LatLng(5.057812439656995, -75.49275659115038), // Start point
          new LatLng(e.latlng.lat, e.latlng.lng) // End point (clicked location)
        ]
      }).on('routesfound', function (e: any) {
        const routes = e.routes;
        console.log(routes);

        // Move the paloma (car) marker along the route
        e.routes[0].coordinates.forEach(function (coord: LatLng, index: number) {
          setTimeout(function () {
            movingMarker.setLatLng(coord);
          }, 100 * index);
        });
      }).addTo(map);
    });

    // Clean up function: Remove map when the component unmounts
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array to run this effect only once

  return (
    <div className='Map'>
      <div id="map" style={{ height: '100vh' }}></div>
    </div>
  );
}

export default Map;
