import { useState, type JSX } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { type LatLngExpression } from "leaflet";
import { useAppDispatch, useAppSelector } from '@/redux/typeHook';
import { saveProfessional } from '@/redux/features/tradeForm/tradeFormSlice';
import StepProgressBar from "./resuable/StepProgressBar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ServiceAreas(): JSX.Element {
  const [distance, setDistance] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.tradeForm.professional);
  const navigate = useNavigate();

  const defaultCenter: LatLngExpression = saved?.serviceAreaCenter ? [saved.serviceAreaCenter.lat, saved.serviceAreaCenter.lng] : [48.1486, 17.1077];
  const [center, setCenter] = useState<LatLngExpression>(defaultCenter);

  // small helper component to capture map clicks with proper typing
  function MapClickSetter({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      },
    });
    return null;
  }

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
              <MapClickSetter onMapClick={(lat, lng) => {
                setCenter([lat, lng]);
                console.log('[ServiceAreas] Map clicked:', { lat, lng });
              }} />
            {distance && (
              <Circle
                center={center}
                radius={distance * 1000}
                pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.3 }}
              />
            )}
          </MapContainer>
        </div>

       <div className="mt-16 flex justify-between">
         <Link to='/trade-person/business-info'>
          <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
            <ArrowLeft size={18} />
            Previous
          </button>
         </Link>

         <button
           onClick={() => {
             // save selected center and distance into trade form
             const [lat, lng] = center as [number, number];
             const payload = {
               serviceAreaCenter: { lat, lng },
               travelDistanceKm: distance ?? undefined,
             };
             console.log('[ServiceAreas] Saving service area payload:', payload);
             dispatch(saveProfessional(payload));
             navigate("/trade-person/credentials");
           }}
           className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
         >
           Continue
           <ArrowRight size={18} />
         </button>
        </div>
      </div>
    </div>
        </div>
    </div>
  );
}
