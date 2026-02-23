'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Loader2, MapPinned } from "lucide-react";
import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Input } from "./ui/input";

const libraries: ("places")[] = ["places"];

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

interface MapProps {
  onLocationUpdate: (lat: number, lng: number) => void;
}

export default function MapCoordinates({ onLocationUpdate }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [coords, setCoords] =
    useState<google.maps.LatLngLiteral | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Map load
  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // Click on map → get coordinates
  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setCoords(position);
    console.log("Selected:", position);
  }, []);

  // Search location → get coordinates
  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();

    if (place.geometry?.location) {
      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setCoords(position);
      map?.panTo(position);
      map?.setZoom(15);
    }
  };

  const handleSave = () => {
    if (coords) {
      onLocationUpdate(coords.lat, coords.lng);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-12 w-14">
            <Button type="button" className="h-full w-full cursor-pointer"><MapPinned /></Button>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 overflow-hidden gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Select Coordinates</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Billing Error or Loading State Handling */}
          {loadError ? (
            <div className="h-[400px] flex flex-col items-center justify-center bg-destructive/10 text-destructive p-6 text-center">
              <AlertTriangle className="h-10 w-10 mb-2" />
              <p className="font-semibold">Google Maps Error</p>
              <p className="text-sm opacity-80">
                Billing not enabled or Invalid API Key. Please check your Google Cloud Console.
              </p>
            </div>
          ) : !isLoaded ? (
            <div className="h-[400px] flex items-center justify-center bg-muted">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="relative">
              {/* Search Box inside Map Area */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-[350px]">
                <Autocomplete
                  onLoad={(ref) => (autocompleteRef.current = ref)}
                  onPlaceChanged={onPlaceChanged}
                >
                  <Input
                    placeholder="Search for a place..."
                    className="bg-white shadow-lg border-none h-10"
                  />
                </Autocomplete>
              </div>

              {/* Map Component */}
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={coords || defaultCenter}
                zoom={12}
                onLoad={onLoad}
                onClick={onMapClick}
                options={{
                  disableDefaultUI: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false,
                }}
              >
                {coords && <Marker position={coords} />}
              </GoogleMap>
            </div>
          )}

          {/* Bottom Info Bar */}
          <div className="p-4 bg-muted/30 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm font-mono bg-white px-3 py-1.5 rounded border shadow-sm w-full sm:w-auto text-center">
              {coords
                ? `Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`
                : "Click on map to pick location"}
            </div>

            <DialogFooter className="w-full sm:w-auto">
              <DialogClose asChild>
                <Button type="button" className="w-full sm:w-auto" onClick={handleSave} disabled={!coords}>
                  Save Coordinates
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
