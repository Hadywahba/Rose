'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SharedProgress from '@/components/shared/shared-progress';
import { ADDRESS_STEPS } from '@/lib/constants/checkout.constant';
import { useTranslations, useLocale } from 'next-intl';

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
  // Translation
  const t = useTranslations('my-addresses');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  });

  // State
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
        <p className="text-muted-foreground">{t('loading-map')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <SharedProgress
        step={ADDRESS_STEPS.map}
        steps={Object.values(ADDRESS_STEPS)}
        secondValue="75%"
      />
      {/* Title & Back */}
      <div className="flex gap-2 pt-2">
        {onBack && (
          <Button
            aria-label="Go back"
            className="rounded-full"
            type="button"
            size="icon"
            onClick={onBack}
          >
            {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          </Button>
        )}
        <p className="text-2xl font-medium text-maroon-600 dark:text-softpink-200">
          {t('map-title')}
        </p>
      </div>

      {/* GoogleMap */}
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

      {/* Action button */}
      <Button
        onClick={handleConfirm}
        className="w-full"
        type="button"
        disabled={isPending}
      >
        {isPending ? t('adding-address') : t('add-address-button')}
      </Button>
    </div>
  );
}
