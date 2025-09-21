import { useState, type JSX } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { type LatLngExpression } from "leaflet";
import StepProgressBar from "./resuable/StepProgressBar";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ServiceAreas(): JSX.Element {
  const [distance, setDistance] = useState<number | null>(null);
  const center: LatLngExpression = [48.1486, 17.1077]; 

  return (
    <div>
        <StepProgressBar
                title="Service Areas"
                step={4}
                totalSteps={8}
                progress={50}
            />
        <div className="bg-[#EFF2F7] min-h-screen py-16">
            <div className="min-h-screen  flex flex-col items-center px-4 py-6 md:px-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Service Areas</h2>

        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Maximum Travel Distance
          </label>
          <select
            value={distance ?? ""}
            onChange={(e) => setDistance(e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-gray-700 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">Select travel distance</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
            <option value="30">30 km</option>
          </select>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-8">Professional Information</h3>

        <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-sm mb-8">
          <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={markerIcon} />
            {distance && (
              <Circle
                center={center}
                radius={distance * 1000}
                pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.3 }}
              />
            )}
          </MapContainer>
        </div>

        <div className="flex justify-between">
          <button className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
            ← Previous
          </button>
          <button className="px-6 py-3 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition flex items-center gap-2">
            Continue →
          </button>
        </div>
      </div>
    </div>
        </div>
    </div>
  );
}
