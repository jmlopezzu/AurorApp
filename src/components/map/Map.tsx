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

    // Initialize marker
    const palomaIcon = L.icon({
      iconUrl: 'paloma.png',
      iconSize: [40, 30]
    });
    const marker = L.marker([5.057812439656995, -75.49275659115038], { icon: palomaIcon }).addTo(map);

    // Handle map click event
    map.on('click', function (e: LeafletMouseEvent) { // Use LeafletMouseEvent
      console.log(e);
      L.marker(e.latlng).addTo(map); // Create marker using e.latlng directly
      (L as any).Routing.control({
        waypoints: [
          new LatLng(5.057812439656995, -75.49275659115038), // Create LatLng objects with 'new'
          new LatLng(e.latlng.lat, e.latlng.lng)
        ]
      }).on('routesfound', function (e: any) { // Use 'any' for now, but better to specify the type if available
        const routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord: LatLng, index: number) { // Add index parameter
          setTimeout(function () {
            marker.setLatLng(coord);
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
      <div id="map"></div>
    </div>
  );
}

export default Map;
