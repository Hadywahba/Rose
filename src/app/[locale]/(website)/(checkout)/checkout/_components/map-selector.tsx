'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const containerStyle = { width: '100%', height: '22rem' };
const center = { lat: 30.0444, lng: 31.2357 }; // Cairo, Egypt

interface MapSelectorProps {
  onSubmit?: (location: { lat: number; lng: number }) => void;
  onBack?: () => void;
  initialPosition?: { lat: number; lng: number };
  isPending?: boolean;
}

export default function MapSelector({
  onSubmit,
  onBack,
  initialPosition = center,
  isPending = false,
}: MapSelectorProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const onClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });
  }, []);

  const handleConfirm = () => {
    onSubmit?.(position);
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg border bg-muted">
        <p className="text-muted-foreground">Loading Map...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 pt-2">
        {onBack && (
          <Button
            aria-label="Go back"
            className="rounded-full"
            type="button"
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <p className="text-2xl font-medium text-maroon-600">
          Find Your Location
        </p>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={12}
          onClick={onClick}
        >
          <Marker position={position} draggable onDragEnd={onClick} />
        </GoogleMap>
      </div>

      {/* Show selected coordinates */}
      <div className="rounded-md bg-maroon-50 p-3 text-sm text-maroon-700">
        📍 Selected Location: {position.lat.toFixed(6)},{' '}
        {position.lng.toFixed(6)}
      </div>

      {/* Action button */}
      <Button
        onClick={handleConfirm}
        className="w-full"
        type="button"
        disabled={isPending}
      >
        {isPending ? 'Adding Address...' : 'Add Address'}
      </Button>
    </div>
  );
}
