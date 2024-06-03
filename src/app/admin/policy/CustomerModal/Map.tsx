'use client'
import React, { ReactNode, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates for Albania's bounding box
const albaniaBounds = [
    [39.62499766702997, 19.263916745003988], // Southwest coordinates
    [42.68824738216557, 21.05361874538451]  // Northeast coordinates
  ];
  
  // Custom hook to update the map center
  function ChangeMapCenter({ center }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  }

  interface IProps {
    coords: Partial<[number, number]>;
    children:ReactNode;
  }
  
const Map:React.FC<IProps> = ({coords, children}) => {
    const [position, setPosition] = useState([41.3275, 19.8189]); // Default position (Tirana, Albania)
    const [markerPosition, setMarkerPosition] = useState(null);
    const [value, setValue] = useState('')
  
    const handleSearch = async () => {
      const query = value;
  
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
  
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
  
        // Check if the new position is within Albania's bounds
        const withinBounds = newPosition[0] >= albaniaBounds[0][0] && newPosition[0] <= albaniaBounds[1][0] &&
                             newPosition[1] >= albaniaBounds[0][1] && newPosition[1] <= albaniaBounds[1][1];
  
        if (withinBounds) {
          setPosition(newPosition);
          setMarkerPosition(newPosition);
        } else {
          alert('Location is outside Albania');
        }
      } else {
        alert('Location not found');
      }
    };
  
  return (

    <div>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search for a location" required />
        <button onClick={handleSearch} >Search</button>
{
    children
}
    <MapContainer 
      center={position} 
      zoom={8} 
      style={{ height: 470, width: '100%' }} 
      maxBounds={albaniaBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ChangeMapCenter center={position} />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Coordinates: {markerPosition[0]}, {markerPosition[1]}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  </div>


 
  );
};

export default Map;
