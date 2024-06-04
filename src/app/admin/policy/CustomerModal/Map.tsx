"use client";

import React, { ReactNode, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useToast } from "@/components/ui/use-toast";
import Input from "../components/Input";
import Image from "next/image";
import Loader from "../components/Loader";
import { Address } from "../type";

// marker
const customIcon = new L.Icon({
  iconUrl: "/svg/marker.svg",
  iconSize: [50, 50],
  className: "fade-in",
});

// Coordinates for Albania's bounding box
const albaniaBounds = [
  [39.62499766702997, 19.263916745003988], // Southwest coordinates
  [42.68824738216557, 21.05361874538451], // Northeast coordinates
];

const isInsideAlbaniaBoundsValidation = (position: ICoords): boolean => {
  // Check if the new position is within Albania's bounds
  const withinBounds =
    position.latitude >= albaniaBounds[0][0] &&
    position.latitude <= albaniaBounds[1][0] &&
    position.longitude >= albaniaBounds[0][1] &&
    position.longitude <= albaniaBounds[1][1];

  return withinBounds;
};

export interface ICoords {
  latitude: number;
  longitude: number;
}

interface ILeafletAddress {
  address: {
    county: string;
    city?: string;
    postcode: string;
    road?: string;
  };
  display_name: string;
  lat: string;
  lon: string;
}

const prepareAddressModel = (leafletModel: ILeafletAddress): Address => {
  return {
    country: leafletModel.address.county,
    city: leafletModel.address.city,
    postalCode: leafletModel.address.postcode,
    streetAddress: leafletModel.address.road,
    streetAddress2: null,
    latitude: parseFloat(leafletModel.lat),
    longitude: parseFloat(leafletModel.lon),
  };
};

interface IProps {
  position: ICoords;
  setPosition: (value: string, model: Address | null) => void;
}

// Custom component that adds a marker at a clicked location
const LocationMarker: React.FC<{
  position: ICoords;
  getAddress: ({ latitude, longitude }: ICoords) => Promise<void>;
}> = ({ position, getAddress }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(
      {
        lat: position?.latitude,
        lng: position?.longitude,
      },
      map.getZoom()
    );
  }, [position]);

  useMapEvents({
    async click(e: any) {
      const newPosition: ICoords = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      };

      await getAddress(newPosition);
    },
  });

  return position && position.latitude !== 0 && position.longitude !== 0 ? (
    <Marker
      position={[position.latitude, position.longitude]}
      // @ts-ignore
      icon={customIcon}
    />
  ) : null;
};

const Map: React.FC<IProps> = ({ position, setPosition }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [value, setValue] = useState(" ");

  const { toast } = useToast();

  const getAddress = async ({ latitude, longitude }: ICoords) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const data: ILeafletAddress = await response.json();

      // @ts-ignore
      if (!!data?.["error"]) return;

      const newPosition: ICoords = {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
      };

      const withinBounds = isInsideAlbaniaBoundsValidation(newPosition);

      if (!withinBounds) {
        toast({
          variant: "destructive",
          title: `Lokacioni qe kerkuat nuk eshte brenda territorit te Shqiperise!`,
        });
      }

      setPosition(data.display_name, prepareAddressModel(data));

      setValue(data.display_name);
    } catch (error) {
      setValue("");

      setPosition("", null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      const query = value;

      if (!query) return;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}`
      );
      const data: ILeafletAddress[] = await response.json();

      if (data?.length <= 0) {
        toast({
          variant: "destructive",
          title: `Lokacioni qe kerkuat nuk ekzsiston!`,
        });
      }

      // the one with the most probability to be the user desired to search
      const firstAddress: ILeafletAddress = data[0];

      const { lat, lon } = firstAddress;

      const newPosition: ICoords = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };

      const withinBounds = isInsideAlbaniaBoundsValidation(newPosition);

      if (!withinBounds) {
        toast({
          variant: "destructive",
          title: `Lokacioni qe kerkuat nuk eshte brenda territorit te Shqiperise!`,
        });
      }

      setPosition(firstAddress.display_name, prepareAddressModel(firstAddress));

      setValue(firstAddress.display_name);
    } catch (error) {
      setValue("");

      setPosition("", null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Loader loading={loading}>
      <div className="flex items-center max-w-sm pb-4">
        <Input
          value={value}
          label="Adresa"
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          className={`bg-esig p-2 rounded-r-md ${
            !!value?.trim()
              ? "bg-esig cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSearch}
        >
          <Image
            src="/svg/search.svg"
            alt="edit"
            width={"0"}
            height={"0"}
            style={{ width: 30, height: 20 }}
            priority
          />
        </div>
      </div>
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
        maxBounds={albaniaBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} getAddress={getAddress} />
      </MapContainer>
    </Loader>
  );
};

export default Map;
