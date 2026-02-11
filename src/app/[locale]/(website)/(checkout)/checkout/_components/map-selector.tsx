'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '600px' };
const center = { lat: 30.0444, lng: 31.2357 }; // Cairo, Egypt

interface MapSelectorProps {
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  initialPosition?: { lat: number; lng: number };
}

export default function MapSelector({
  onLocationSelect,
  initialPosition = center,
}: MapSelectorProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [position, setPosition] = useState(initialPosition);

  

  const onClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosition({ lat, lng });

      onLocationSelect?.({ lat, lng });
    },
    [onLocationSelect],
  );

useEffect(() => {
  console.log('Position object:', position);
}, [position]);


  if (!isLoaded) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg border bg-muted">
        <p className="text-muted-foreground">Loading Map...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={12}
        onClick={onClick}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}
